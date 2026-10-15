# Original score, 起承轉合 in four movements, timed to the film (231.2 s).
import numpy as np, wave
SR=44100; D=231.2; N=int(SR*D)
L=np.zeros(N); R=np.zeros(N)
bpm=72; beat=60/bpm; bar=4*beat
def m(k): return 440*2**((k-69)/12)
def add(sig,t0,pan=0.0,amp=1.0):
    i0=int(t0*SR)
    if i0>=N or i0<0: return
    n=min(len(sig),N-i0); s=sig[:n]*amp
    L[i0:i0+n]+=s*np.cos((pan+1)*np.pi/4); R[i0:i0+n]+=s*np.sin((pan+1)*np.pi/4)
_pc={}
def piano(f,dur=4.0,vel=1.0):
    key=(round(f,2),round(dur,2))
    if key not in _pc:
        n=int(dur*SR); t=np.arange(n)/SR; s=np.zeros(n)
        for h in range(1,10):
            fh=f*h*np.sqrt(1+0.00035*h*h)
            if fh>15000: break
            s+=(0.62/h**1.2)*np.sin(2*np.pi*fh*t)*np.exp(-t*(0.7+0.5*h)*(f/260)**0.35)
        s*=np.minimum(1,t/0.003); s+=np.random.default_rng(int(f)).normal(0,1,n)*np.exp(-t*90)*0.015
        s*=np.minimum(1,np.maximum(0,(dur-t)/0.4)); _pc[key]=s
    return _pc[key]*vel
def strings(f,dur,att=1.2,rel=1.6,bright=7):
    n=int(dur*SR); t=np.arange(n)/SR; s=np.zeros(n)
    for dt in (-0.1,0.0,0.11):
        vib=1+0.0035*np.sin(2*np.pi*5.1*t+dt*30)*np.minimum(1,t/1.2)
        ph=2*np.pi*np.cumsum(f*2**(dt/12)*vib)/SR
        for h in range(1,bright+1): s+=np.sin(h*ph)/h*(0.78**h)
    return s*np.minimum(1,t/att)*np.minimum(1,np.maximum(0,(dur-t)/rel))/3
def celesta(f,dur=2.5,vel=1.0):
    n=int(dur*SR); t=np.arange(n)/SR
    return (np.sin(2*np.pi*f*t)+0.3*np.sin(2*np.pi*4*f*t)*np.exp(-t*8))*np.exp(-t*2.2)*np.minimum(1,t/0.002)*vel
def timp(f,t0,amp):
    n=int(2.5*SR); t=np.arange(n)/SR; s=np.sin(2*np.pi*f*t*(1+0.02*np.exp(-t*8)))*np.exp(-t*2.5)+np.random.default_rng(3).normal(0,1,n)*np.exp(-t*30)*0.2
    add(s,t0,0,amp)
# chords (voicings) by name
CH={'D':[38,50,57,62,66],'Bm':[35,47,54,59,62],'G':[31,43,50,55,59],'A':[33,45,52,57,61],'D/F#':[42,50,57,62,66],'Em':[40,52,55,59,64],'F#m':[42,49,54,57,61],
    'E':[40,52,59,64,68],'C#m':[37,49,56,61,64],'A2':[33,45,52,57,59],'B':[35,47,54,59,63],'E/G#':[44,52,59,64,68],'F#m7':[42,52,57,61,64],'Gmaj7':[31,43,54,59,62]}
A_CH=['D','Bm','G','A','D/F#','G','A','D']
A_MEL=[[(78,1),(76,1),(74,1),(69,1)],[(71,1),(74,1),(76,2)],[(78,1),(81,1),(79,1),(78,1)],[(76,4)],[(74,1),(76,1),(78,1),(74,1)],[(79,1),(78,1),(76,1),(74,1)],[(73,1),(74,1),(76,1),(69,1)],[(74,4)]]
B_CH=['Bm','F#m','G','D','Em','Bm','Gmaj7','A']
B_MEL=[[(71,1),(73,1),(74,1),(78,1)],[(76,1),(74,1),(73,2)],[(71,1),(74,1),(79,1),(78,1)],[(78,2),(76,1),(74,1)],[(76,1),(79,1),(83,1),(81,1)],[(78,2),(74,2)],[(76,1),(78,1),(79,1),(81,1)],[(81,2),(76,2)]]
def tr(ch,k): return [n+k for n in ch]
def phrase(t0,chs,mel,k=0,lvl=1.0,arp=True,pad=0.0,cello=0.0,mel_inst='piano',melamp=0.14,counter=False,celeste=0.0):
    for b in range(8):
        tb=t0+b*bar; ch=tr(CH[chs[b]],k)
        add(piano(m(ch[0]),5.0,0.16*lvl),tb,-0.25)
        if arp:
            pat=[1,2,3,4,3,2,3,2]
            for j,ix in enumerate(pat): add(piano(m(ch[ix]),3.0,(0.11 if j%4 else 0.15)*lvl),tb+j*beat/2,0.2*np.sin(j))
        else:
            add(piano(m(ch[2]),5.0,0.09*lvl),tb+beat,0.1); add(piano(m(ch[3]),5.0,0.08*lvl),tb+beat*2,0.15)
        if pad>0:
            for i,nn in enumerate(ch[2:5]): add(strings(m(nn),bar+1.4,att=1.4,bright=5),tb,(i-1)*0.45,pad)
        if cello>0: add(strings(m(ch[1]),bar+1.0,att=0.8,bright=6),tb,-0.35,cello)
        tm=tb
        for nn,dur in mel[b]:
            f=m(nn+k)
            if mel_inst=='piano': add(piano(f,dur*beat+2.5,melamp*lvl),tm,0.15)
            elif mel_inst=='strings': add(strings(f,dur*beat+0.5,att=0.25,rel=0.6,bright=8),tm,0.1,melamp)
            else: add(piano(f,dur*beat+2.5,melamp*lvl*0.8),tm,0.15); add(strings(f,dur*beat+0.5,att=0.25,rel=0.6,bright=8),tm,0.05,melamp*0.55)
            if celeste>0: add(celesta(m(nn+k+12),2.0,celeste),tm,0.4)
            tm+=dur*beat
        if counter and b%2==1: add(strings(m(ch[4]+12),bar*0.9,att=0.6,bright=6),tb+beat,0.35,0.035*lvl)
# 起 Intro: Taipei → Yilan (0–38s): solo piano, sparse
t=1.2
for b in range(2):
    ch=CH[A_CH[b*3]]; add(piano(m(ch[0]),6,0.15),t+b*bar,-0.2); add(piano(m(ch[3]),6,0.1),t+b*bar+beat,0.1); add(piano(m(ch[4]+12),6,0.08),t+b*bar+beat*2.5,0.2)
phrase(t+2*bar,A_CH,A_MEL,lvl=0.8,arp=False,melamp=0.13)
# 承 Development: Hualien → Alishan (≈37.8–105)
t2=t+10*bar
phrase(t2,A_CH,A_MEL,lvl=0.95,arp=True,pad=0.045,melamp=0.14)
phrase(t2+8*bar,A_CH,A_MEL,lvl=1.0,arp=True,pad=0.055,cello=0.05,mel_inst='both',melamp=0.11,counter=True)
for b in range(4):  # bridge, rising
    tb=t2+16*bar+b*bar; ch=CH[['G','A','Bm','A'][b]]
    for j in range(8): add(piano(m(ch[1+j%4]+12),2.5,0.1+0.01*b),tb+j*beat/2,0.2*np.sin(j))
    add(strings(m(ch[2]),bar+1,att=1.0,bright=6),tb,0,0.05+0.01*b)
# 轉 Turn: Chiayi City → Hsinchu (≈107–173): relative minor theme B, building
t3=t2+20*bar
phrase(t3,B_CH,B_MEL,lvl=0.9,arp=True,pad=0.05,cello=0.05,mel_inst='piano',melamp=0.14)
phrase(t3+8*bar,B_CH,B_MEL,lvl=1.05,arp=True,pad=0.07,cello=0.07,mel_inst='both',melamp=0.12,counter=True)
for b in range(2):  # crescendo into the return
    tb=t3+16*bar+b*bar; ch=tr(CH[['A','B'][b]],0)
    for j in range(8): add(piano(m(ch[1+j%4]+12),2.5,0.11+0.02*b),tb+j*beat/2,0.2*np.sin(j))
    add(strings(m(ch[2]),bar+1,att=0.8,bright=7),tb,-0.2,0.06+0.015*b); add(strings(m(ch[4]),bar+1,att=0.8,bright=7),tb,0.2,0.05+0.015*b)
    if b==1: timp(m(ch[0]),tb+bar-0.05,0.25)
# 合 Resolution: Hsinchu City → airport → islands → landing (≈177–214): theme A up a tone (E), full
t4=t3+18*bar
phrase(t4,A_CH,A_MEL,k=2,lvl=1.15,arp=True,pad=0.085,cello=0.08,mel_inst='both',melamp=0.15,counter=True)
timp(m(40),t4,0.3)
phrase(t4+8*bar,A_CH[:4]+['D/F#','G','A','D'],A_MEL,k=2,lvl=1.1,arp=True,pad=0.08,cello=0.07,mel_inst='both',melamp=0.14,counter=True,celeste=0.04)
# Coda: home, sleep, credits (≈214–231): solo piano, slower, back in D
t5=t4+16*bar
for b,(cn,mn) in enumerate([('G',[(79,2),(78,2)]),('A',[(76,2),(73,2)]),('D',[(74,4)])]):
    tb=t5+b*bar*1.15; ch=CH[cn]; add(piano(m(ch[0]),6,0.13),tb,-0.2); add(piano(m(ch[2]),6,0.08),tb+beat,0.1); add(piano(m(ch[3]),6,0.07),tb+beat*2,0.15)
    tm=tb
    for nn,dur in mn: add(piano(m(nn),dur*beat*1.15+3,0.12),tm,0.15); tm+=dur*beat*1.15
tf=t5+3*bar*1.15+0.3
for i,nn in enumerate([38,50,57,62,66,69,74]): add(piano(m(nn),9,0.1),tf+i*0.09,-0.3+i*0.1)
add(strings(m(50),9,att=2,rel=5),tf-0.5,0,0.04)
print('sections', round(t2,1), round(t3,1), round(t4,1), round(t5,1), round(tf,1))
def ir(seed,dur=3.4):
    n=int(dur*SR); t=np.arange(n)/SR; r=np.random.default_rng(seed).normal(0,1,n)*np.exp(-t*2.0); r[:int(0.025*SR)]=0; return r/np.sqrt(np.sum(r**2))
def conv(x,h):
    n=len(x)+len(h)-1; nf=1<<(n-1).bit_length(); return np.fft.irfft(np.fft.rfft(x,nf)*np.fft.rfft(h,nf),nf)[:len(x)]
wl=conv(L,ir(1)); wr=conv(R,ir(2))
L2=L*0.72+wl*0.6; R2=R*0.72+wr*0.6
env=np.ones(N); fi=int(1.2*SR); env[:fi]=np.linspace(0,1,fi); fo=int(4*SR); env[-fo:]=np.linspace(1,0,fo)**1.3
st=np.stack([L2*env,R2*env],1); st/=np.max(np.abs(st))*1.12
import os; os.makedirs('build',exist_ok=True)
with wave.open('build/music.wav','wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st*32767).astype(np.int16).tobytes())
print('ok', len(st)/SR)
