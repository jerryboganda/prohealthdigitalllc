/**
 * Hero shader: a slow, domain-warped gradient in the brand palette (raw WebGL, no library).
 * Loaded only when motion is allowed; starts idle + visible; capped DPR; pauses off-screen/hidden;
 * the CSS poster underneath stays as the fallback and is never replaced as the LCP element.
 */
const vertex = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;
const fragment = `precision mediump float;
uniform vec2 u_res;uniform float u_time;uniform vec2 u_pointer;uniform float u_dir;
float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);
return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*noise(p);p*=2.03;a*=.5;}return v;}
void main(){
vec2 uv=gl_FragCoord.xy/u_res;if(u_dir<0.)uv.x=1.-uv.x;
float aspect=u_res.x/u_res.y;vec2 p=vec2(uv.x*aspect,uv.y);
float t=u_time*.03;
vec2 q=vec2(fbm(p*1.3+t),fbm(p*1.3-t+3.1));
vec2 r=vec2(fbm(p*1.15+2.*q+vec2(1.7,9.2)+t*1.3),fbm(p*1.15+2.*q+vec2(8.3,2.8)-t));
float f=fbm(p*1.05+2.2*r);
vec3 paper=vec3(.984,.984,.973);vec3 mint=vec3(.86,.948,.92);
vec3 teal=vec3(.0,.70,.66);vec3 royal=vec3(.106,.306,.847);
vec3 col=mix(paper,mint,smoothstep(.25,.85,f));
col=mix(col,teal,smoothstep(.52,.95,r.x)*.30*uv.x);
col=mix(col,royal,smoothstep(.55,1.,q.y*r.y*1.7)*.24*uv.x);
vec2 m=u_pointer;m.x*=aspect;
col+=teal*.07*smoothstep(.5,0.,distance(p,m));
float fade=smoothstep(.0,.55,uv.x);
col=mix(paper,col,.35+.65*fade);
gl_FragColor=vec4(col,1.);}`;

export default function init(host: HTMLElement) {
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (conn?.saveData) return;
  const canvas = document.createElement("canvas");
  canvas.className = "shader-canvas";
  canvas.setAttribute("aria-hidden", "true");
  const gl = canvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    depth: false,
    powerPreference: "low-power",
  });
  if (!gl) return;
  const compile = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  };
  const vs = compile(gl.VERTEX_SHADER, vertex);
  const fs = compile(gl.FRAGMENT_SHADER, fragment);
  if (!vs || !fs) return;
  const program = gl.createProgram()!;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(program, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const uRes = gl.getUniformLocation(program, "u_res");
  const uTime = gl.getUniformLocation(program, "u_time");
  const uPointer = gl.getUniformLocation(program, "u_pointer");
  gl.uniform1f(
    gl.getUniformLocation(program, "u_dir"),
    document.documentElement.dir === "rtl" ? -1 : 1,
  );

  const mobile = window.matchMedia("(max-width: 767px)").matches;
  const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.5);
  const frameBudget = mobile ? 1000 / 30 : 0;
  const pointer = { x: 0.7, y: 0.5, tx: 0.7, ty: 0.5 };
  let visible = false;
  let raf = 0;
  let last = 0;
  const start = performance.now();

  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    canvas.width = Math.max(1, Math.round(width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uRes, canvas.width, canvas.height);
  };
  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    if (frameBudget && now - last < frameBudget) return;
    last = now;
    pointer.x += (pointer.tx - pointer.x) * 0.04;
    pointer.y += (pointer.ty - pointer.y) * 0.04;
    gl.uniform1f(uTime, (now - start) / 1000);
    gl.uniform2f(uPointer, pointer.x, pointer.y);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  const run = () => {
    cancelAnimationFrame(raf);
    if (visible && !document.hidden) raf = requestAnimationFrame(frame);
  };

  new ResizeObserver(resize).observe(host);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    run();
  }).observe(host);
  document.addEventListener("visibilitychange", run);
  host.addEventListener("pointermove", (e) => {
    const r = host.getBoundingClientRect();
    pointer.tx = (e.clientX - r.left) / r.width;
    pointer.ty = 1 - (e.clientY - r.top) / r.height;
  });
  canvas.addEventListener("webglcontextlost", () => {
    cancelAnimationFrame(raf);
    canvas.remove();
  });

  const mount = () => {
    resize();
    host.appendChild(canvas);
    requestAnimationFrame(() => canvas.classList.add("is-live"));
  };
  if ("requestIdleCallback" in window) window.requestIdleCallback(mount, { timeout: 1500 });
  else setTimeout(mount, 300);
}
