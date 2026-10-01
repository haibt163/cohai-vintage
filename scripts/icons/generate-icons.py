#!/usr/bin/env python3
"""Regenerates the Cô Hai Vintage icon set from real serif outlines (no runtime font dependency in the site).

Outputs (relative to the repository root):
  app/favicon.ico (16/32/48)  app/icon.svg  app/apple-icon.png (180, opaque)
  public/icons/icon-192.png  public/icons/icon-512.png  public/icons/icon-maskable-512.png (opaque, safe-zone layout)

Requires: Python 3, Pillow, fontTools, and Liberation Serif Bold / Liberation Sans Bold (SIL OFL) at the paths below.
Palette (existing brand): dark #171513, gold #b59a7e, cream #f4f0e9. The site does NOT run this; commit the outputs.
"""
import os
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
from fontTools.ttLib import TTFont
from fontTools.pens.recordingPen import RecordingPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from PIL import Image, ImageDraw, ImageChops

SERIF = "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf"
SANS  = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"
DARK, GOLD, CREAM = "#171513", "#b59a7e", "#f4f0e9"
W = 512

class Face:
    def __init__(self, path):
        self.f = TTFont(path); self.gs = self.f.getGlyphSet(); self.cmap = self.f.getBestCmap()
        self.upm = self.f['head'].unitsPerEm; self.cap = getattr(self.f['OS/2'], 'sCapHeight', 0.66*self.upm) or 0.66*self.upm
        self.hmtx = self.f['hmtx']
    def advance(self, ch): return self.hmtx[self.cmap[ord(ch)]][0]
    def width(self, text, size, tracking=0):
        s = size/self.upm; return sum(self.advance(c) for c in text)*s + tracking*(len(text)-1)
    def layout(self, text, cap_height, cx, baseline, tracking=0):
        """yield (glyphname, scale, x0) for each glyph so text is centred at cx with the requested cap height"""
        size = cap_height/self.cap*self.upm; s = size/self.upm
        total = self.width(text, size, tracking); x = cx-total/2; out=[]
        for c in text:
            out.append((self.cmap[ord(c)], s, x, baseline)); x += self.advance(c)*s + tracking
        return out

def flatten(rec, s, x0, base, n=14):
    """RecordingPen value -> list of contours in pixel space (y flipped)."""
    contours=[]; cur=[]; pt=None
    T=lambda p:(x0+p[0]*s, base-p[1]*s)
    def quad(p0,p1,p2):
        return [((1-t)**2*p0[0]+2*(1-t)*t*p1[0]+t*t*p2[0],(1-t)**2*p0[1]+2*(1-t)*t*p1[1]+t*t*p2[1]) for t in [i/n for i in range(1,n+1)]]
    for op,args in rec:
        if op=='moveTo': cur=[T(args[0])]; pt=args[0]
        elif op=='lineTo': cur.append(T(args[0])); pt=args[0]
        elif op=='qCurveTo':
            pts=list(args); 
            if pts[-1] is None: pts=pts[:-1]
            # decompose implied on-curve points
            offs=pts[:-1]; end=pts[-1]; p0=pt
            for i,o in enumerate(offs):
                nxt = end if i==len(offs)-1 else ((o[0]+offs[i+1][0])/2,(o[1]+offs[i+1][1])/2)
                cur += [T(q) for q in quad(p0,o,nxt)]; p0=nxt
            pt=end
        elif op in('closePath','endPath'):
            if cur: contours.append(cur); cur=[]
        elif op=='curveTo':
            p0=pt; c1,c2,e=args
            cur += [T(((1-t)**3*p0[0]+3*(1-t)**2*t*c1[0]+3*(1-t)*t*t*c2[0]+t**3*e[0],(1-t)**3*p0[1]+3*(1-t)**2*t*c1[1]+3*(1-t)*t*t*c2[1]+t**3*e[1])) for t in [i/n for i in range(1,n+1)]]; pt=e
    return contours

def glyph_contours(face, items):
    out=[]
    for name,s,x0,base in items:
        pen=RecordingPen(); face.gs[name].draw(pen); out+=flatten(pen.value,s,x0,base)
    return out

def glyph_svg(face, items):
    d=[]
    for name,s,x0,base in items:
        sp=SVGPathPen(face.gs, ntos=lambda v: ("%.2f"%v).rstrip('0').rstrip('.'))
        face.gs[name].draw(TransformPen(sp,(s,0,0,-s,x0,base))); d.append(sp.getCommands())
    return " ".join(d)

SERIF_F, SANS_F = Face(SERIF), Face(SANS)

def design(kind):
    """Return dict describing the icon; coordinates in a 512 space."""
    if kind=="full":       # 180/192/512: frame + CH + dot + VINTAGE
        return dict(bg="round", frame=(44,3), mono=(128,246,300), sub=(24,400,14), dot=(426,84,13))
    if kind=="full_bleed": # apple-touch (iOS rounds the corners itself)
        return dict(bg="square", frame=(44,3), mono=(128,246,300), sub=(24,400,14), dot=(426,84,13))
    if kind=="maskable":   # Android adaptive: everything inside the central 80% safe zone, full-bleed bg
        return dict(bg="square", frame=None, mono=(112,262,282), sub=(17,368,11), dot=None)
    if kind=="tiny":       # favicon 32-48 and SVG tab icon
        return dict(bg="round", frame=None, mono=(172,310,256), sub=None, dot=None, bar=(360,270,16))
    if kind=="tiny16":     # favicon 16
        return dict(bg="round", frame=None, mono=(178,340,256), sub=None, dot=None, bar=None)

def bbox(conts):
    xs=[p[0] for c in conts for p in c]; ys=[p[1] for c in conts for p in c]; return min(xs),min(ys),max(xs),max(ys)

def contours_for(kind):
    d=design(kind); res={}
    cap,base,_=d['mono']; res['mono']=glyph_contours(SERIF_F, SERIF_F.layout("CH",cap,W/2,base,tracking=-6))
    res['mono_svg']=glyph_svg(SERIF_F, SERIF_F.layout("CH",cap,W/2,base,tracking=-6))
    bb=bbox(res['mono'])
    if d['dot']:
        dx,dy,dr_=d['dot']; assert dx-dr_>bb[2]+8 or dy+dr_<bb[1]-8, 'dot overlaps monogram'
    if d['sub']:
        cap2,base2,trk=d['sub']; it=SANS_F.layout("VINTAGE",cap2,W/2,base2,tracking=trk)
        res['sub']=glyph_contours(SANS_F,it); res['sub_svg']=glyph_svg(SANS_F,it)
    return d,res

def raster(kind, px, ss=8):
    d,res=contours_for(kind); S=W*ss//1
    img=Image.new("RGBA",(S,S),(0,0,0,0)); dr=ImageDraw.Draw(img)
    rad = 112*ss if d['bg']=="round" else 0
    dr.rounded_rectangle([0,0,S-1,S-1],radius=rad,fill=DARK) if rad else dr.rectangle([0,0,S,S],fill=DARK)
    if d['frame']:
        ins,wd=d['frame']; dr.rounded_rectangle([ins*ss,ins*ss,S-ins*ss,S-ins*ss],radius=6*ss,outline=GOLD,width=wd*ss)
    def fill(conts,color):
        mask=Image.new("L",(S,S),0)
        for c in conts:
            m=Image.new("L",(S,S),0); ImageDraw.Draw(m).polygon([(x*ss,y*ss) for x,y in c],fill=255); mask=ImageChops.logical_xor(mask.convert("1"),m.convert("1")).convert("L")
        img.paste(Image.new("RGBA",(S,S),color),(0,0),mask)
    fill(res['mono'],CREAM)
    if 'sub' in res: fill(res['sub'],GOLD)
    if d['dot']:
        x,y,r=d['dot']; dr.ellipse([(x-r)*ss,(y-r)*ss,(x+r)*ss,(y+r)*ss],fill=GOLD)
    if d.get('bar'):
        y,w,h=d['bar']; dr.rounded_rectangle([(W-w)/2*ss,y*ss,(W+w)/2*ss,(y+h)*ss],radius=h/2*ss,fill=GOLD)
    return img.resize((px,px),Image.LANCZOS)

def svg(kind="tiny"):
    d,res=contours_for(kind)
    parts=[f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {W}" width="{W}" height="{W}">',
           f'<title>Cô Hai Vintage</title>',
           f'<rect width="{W}" height="{W}" rx="112" fill="{DARK}"/>',
           f'<path fill="{CREAM}" fill-rule="evenodd" d="{res["mono_svg"]}"/>']
    if d.get('bar'):
        y,w,h=d['bar']; parts.append(f'<rect x="{(W-w)/2:g}" y="{y}" width="{w}" height="{h}" rx="{h/2:g}" fill="{GOLD}"/>')
    parts.append('</svg>'); return "\n".join(parts)+"\n"

OUT=ROOT+os.sep
raster("full",512).save(OUT+"public/icons/icon-512.png",optimize=True)
raster("full",192).save(OUT+"public/icons/icon-192.png",optimize=True)
raster("maskable",512).convert("RGB").save(OUT+"public/icons/icon-maskable-512.png",optimize=True)
raster("full_bleed",180).convert("RGB").save(OUT+"app/apple-icon.png",optimize=True)
open(OUT+"app/icon.svg","w",encoding="utf8").write(svg("tiny"))
ico_imgs=[raster("tiny16",16),raster("tiny",32),raster("tiny",48)]
ico_imgs[2].save(OUT+"app/favicon.ico",format="ICO",sizes=[(16,16),(32,32),(48,48)],append_images=[ico_imgs[0],ico_imgs[1]])
print("icons written")
