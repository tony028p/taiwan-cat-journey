import numpy as np, wave
SR=44100; D=60.0; N=int(SR*D); out=np.zeros(N)
bpm=92; beat=60/bpm
def note(f,t0,dur,amp,kind='box'):
    i0=int(t0*SR); n=int(dur*SR); 
    if i0>=N: return
    n=min(n,N-i0); t=np.arange(n)/SR
    if kind=='box': s=(np.sin(2*np.pi*f*t)+0.25*np.sin(2*np.pi*2*f*t)+0.08*np.sin(2*np.pi*3.01*f*t))*np.exp(-t*2.6)
    elif kind=='pluck': s=(np.sin(2*np.pi*f*t)+0.4*np.sin(2*np.pi*2*f*t)*np.exp(-t*6))*np.exp(-t*3.5)
    else: s=np.sin(2*np.pi*f*t)*(0.7+0.3*np.sin(2*np.pi*0.5*t)); s*=np.minimum(1,t/0.6)*np.minimum(1,(dur-t)/0.8)
    s*=np.minimum(1,t/0.004)
    out[i0:i0+n]+=amp*s
m=lambda k:440*2**((k-69)/12)
# C  Am  F  G  (each 2 beats... use 1 bar = 4 beats)
prog=[[60,64,67],[57,60,64],[53,57,60],[55,59,62]]
bars=int(D/(4*beat))+1
rng=np.random.default_rng(7)
penta=[72,74,76,79,81,84]
mel_pat=[[0,2,4,2],[4,3,2,1],[1,2,3,5],[3,2,1,0]]
for b in range(bars):
    ch=prog[b%4]; t0=b*4*beat
    for k,n in enumerate(ch): note(m(n),t0,4*beat,0.05,'pad')
    note(m(ch[0]-12),t0,2*beat,0.22,'pluck'); note(m(ch[0]-12+7),t0+2*beat,2*beat,0.16,'pluck')
    for k in range(4):  # ukulele-ish strum on off-beats
        for j,n in enumerate(ch): note(m(n),t0+k*beat+0.5*beat+j*0.012,beat,0.045,'pluck')
    if b>=1:
        pat=mel_pat[(b//1)%4]
        for k in range(4):
            idx=min(len(penta)-1,pat[k]+(1 if b%8>=4 else 0))
            nn=penta[idx]
            # snap to chord-friendly
            note(m(nn),t0+k*beat,beat*1.5,0.12,'box')
            if rng.random()<0.45: note(m(nn+(2 if nn<84 else -3)),t0+k*beat+beat/2,beat,0.07,'box')
env=np.ones(N); fi=int(1.0*SR); fo=int(3.0*SR)
env[:fi]=np.linspace(0,1,fi); env[-fo:]=np.linspace(1,0,fo)
out*=env
# simple reverb: few delays
rev=out.copy()
for d,g in [(0.031,0.35),(0.047,0.3),(0.083,0.22),(0.131,0.16),(0.197,0.1)]:
    k=int(d*SR); rev[k:]+=g*out[:-k]
rev/=np.max(np.abs(rev))*1.15
st=np.stack([rev,np.roll(rev,int(0.008*SR))],1)
with wave.open('music.wav','wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st*32767).astype(np.int16).tobytes())
print('ok')
