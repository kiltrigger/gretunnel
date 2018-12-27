function RGB(red, green, blue)
{
this.r = red;
this.g = green;
this.b = blue;
}
RGB.prototype.getR = function() { return this.r; };
RGB.prototype.getG = function() { return this.g; };
RGB.prototype.getB = function() { return this.b; };
RGB.prototype.getHex = function() {
if (!this.hex)
{
var map = '0123456789ABCDEF';
this.hex = '' +
map.substr(Math.floor(this.r / 16), 1) + 
map.substr((this.r % 16), 1) +
map.substr(Math.floor(this.g / 16), 1) + 
map.substr((this.g % 16), 1) +
map.substr(Math.floor(this.b / 16), 1) + 
map.substr((this.b % 16), 1);
}
return this.hex;
};
RGB.prototype.toHSV = function() {
var r = this.r / 255;
var g = this.g / 255;
var b = this.b / 255;
var max  = (r > g) ? r : g;
max  = (max > b) ? max : b;
var min  = (r < g) ? r : g;
min  = (min < b) ? min : b;
var delta = max - min;
var v = max;
var s = 0;
if (max > 0) { s = delta / max; }
var h = 0;
if (delta > 0)
{
if ((max == r) && (max != g))
{
h += (g - b) / delta;
}
if ((max == g) && (max != b))
{
h += (2 + (b - r) / delta);
}
if ((max == b) && (max != r))
{
h += (4 + (r - g) / delta);
}
h = h * 60;
if (h < 0) { h += 360; }
}
var result = new HSV(h, s, v);
return result;
};
RGB.prototype.dump = function() {
alert('Red: '   + this.r + "\n" +
'Green: ' + this.g + "\n" +
'Blue: '  + this.b + "\n" +
'Hex: '   + this.getHex()
);
};
function HSV(hue, saturation, value)
{
this.h = hue;
this.s = saturation;
this.v = value;
}
HSV.prototype.getH = function() { return this.h; };
HSV.prototype.getS = function() { return this.s; };
HSV.prototype.getV = function() { return this.v; };
HSV.prototype.toRGB = function() {
var sat_r;
var sat_g;
var sat_b;
if (this.h < 120)
{
sat_r = (120 - this.h) / 60;
sat_g = this.h / 60;
sat_b = 0;
}
else if (this.h < 240)
{
sat_r = 0;
sat_g = (240 - this.h) / 60;
sat_b = (this.h - 120) / 60;
}
else 
{
sat_r = (this.h - 240) / 60;
sat_g = 0;
sat_b = (360 - this.h) / 60;
}
if (sat_r > 1) { sat_r = 1; }
if (sat_g > 1) { sat_g = 1; }
if (sat_b > 1) { sat_b = 1; }
var result = new RGB(
Math.round((1 - this.s + this.s * sat_r) * this.v * 255),
Math.round((1 - this.s + this.s * sat_g) * this.v * 255),
Math.round((1 - this.s + this.s * sat_b) * this.v * 255)
);
return result;
};
HSV.prototype.dump = function() {
alert('Hue: '        + this.h + "\n" +
'Saturation: ' + this.s + "\n" +
'Value: '      + this.v + "\n"
);
};
/* Container object that holds an RGB object and an HSV object.
This is the catch-all type that gives you everything
you will need up front.  With this object, you can create
a color from RGB values, HSV values, or a hex string.
Upon object creation, you are not guaranteed that any of the
private properties exist yet (they are created as needed).
Therefore, you must use accessor methods to get each property
of this object.
*/
function HexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function HexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function HexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
function Color(type, a, b, c)
{
if (type == 'rgb')
{
this.rgb = new RGB(a,b,c);
this.r = a;
this.g = b;
this.b = c;
}
else if (type == 'hsv')
{
this.hsv = new HSV(a,b,c);
this.h = a;
this.s = b;
this.v = c;
}
else if (type.match(/[0-9a-f]{6}/i))
{
this.r = HexToR(type);
this.g = HexToG(type);
this.b = HexToB(type);
this.rgb = new RGB(this.r, this.g, this.b);
this.hex = type;
}
else
{
return null;
}
}
Color.prototype.getR = function() {
if (!this.r)
{
if (!this.rgb) { this.rgb = this.hsv.toRGB(); }
this.r = this.rgb.getR();
}
return this.r;
};
Color.prototype.getG = function() {
if (!this.g)
{
if (!this.rgb) { this.rgb = this.hsv.toRGB(); }
this.g = this.rgb.getG();
}
return this.g;
};
Color.prototype.getB = function() {
if (!this.b)
{
if (!this.rgb) { this.rgb = this.hsv.toRGB(); }
this.b = this.rgb.getB();
}
return this.b;
};
Color.prototype.getH = function() {
if (!this.h)
{
if (!this.hsv) { this.hsv = this.rgb.toHSV(); }
this.h = this.hsv.getH();
}
return this.h;
};
Color.prototype.getS = function() {
if (!this.s)
{
if (!this.hsv) { this.hsv = this.rgb.toHSV(); }
this.s = this.hsv.getS();
}
return this.s;
};
Color.prototype.getV = function() {
if (!this.v)
{
if (!this.hsv) { this.hsv = this.rgb.toHSV(); }
this.v = this.hsv.getV();
}
return this.v;
};
Color.prototype.getHex = function() {
if (!this.hex)
{
if (!this.rgb) { this.rgb = this.hsv.toRGB(); }
this.hex = this.rgb.getHex();
}
return this.hex;
};
Color.prototype.getContrasting = function() {
var newH = this.getH();
var newS = this.getS();
var newV = this.getV();
if (newS == 0)
{
newV = (newV + 0.5) % 1;
}
else
{
newS = (newS + 0.5) % 1;
newV = (newV + 0.5) % 1;
if ((newH > 200) && (newH < 275))
{
if ((newS >= 0.5) && (newV >= 0.5))
{
newS = newS / 2;
}
else if ((newS <= 0.5) && (newV <= 0.5))
{
newV = newV + 0.5;
}
}
}
return new Color('hsv', newH, newS, newV);
};
Color.prototype.getSimilar = function() {
var newH = this.getH();
var newS = this.getS();
var newV = this.getV();
var tweak = (newS > 0.8) ? 0.1 : 0;
if (newV > 0.6) { newV = newV - 0.2 - tweak; }
else if (newV < 0.4) { newV = newV + 0.2 + tweak; }
else { newV = newV - 0.3; }
if ((newH > 200) && (newH < 275))
{
if (newS > 0.8) { newS = newS - 0.4; }
}
return new Color('hsv', newH, newS, newV);
};
Color.prototype.isDark = function() {
var rval = false;
var v = this.getV();
if (v < 0.6)
{
rval = true;
}
else
{
var h = this.getH();
var s = this.getS();
if ((h > 200) && (h < 275))
{
if (s > 0.5) { 
rval = true; 
}
}
}
return rval;
};
Color.prototype.dump = function() {
alert('Red: '        + this.getR()   + "\n" +
'Green: '      + this.getG()   + "\n" +
'Blue: '       + this.getB()   + "\n" +
'Hex: '        + this.getHex() + "\n" +
'Hue: '        + this.getH()   + "\n" +
'Saturation: ' + this.getS()   + "\n" +
'Value: '      + this.getV()
);
};
