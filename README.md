# CONTRAST RATIO CALCULATION
#### Good contrast ensures that texts and interface elements are easily readable and distinguishable
https://www.w3.org/TR/WCAG/#dfn-contrast-ratio
According to W3C the contrast ratio is calculated:
contrast ratio = (L1 + 0.05) / (L2 + 0.05)

L1 and L2 are the relative luminance of the lighter and the darker color.
#### Luminance relative
https://www.w3.org/TR/WCAG/#dfn-relative-luminance
For the sRGB colorspace, the relative luminance of a color is defined as L = 0.2126 * R + 0.7152 * G + 0.0722 * B where R, G and B are defined as:
* if RsRGB <= 0.03928 then R = RsRGB/12.92 else R = ((RsRGB+0.055)/1.055) ^ 2.4
* if GsRGB <= 0.03928 then G = GsRGB/12.92 else G = ((GsRGB+0.055)/1.055) ^ 2.4
* if BsRGB <= 0.03928 then B = BsRGB/12.92 else B = ((BsRGB+0.055)/1.055) ^ 2.4
and RsRGB, GsRGB, and BsRGB are defined as:
* RsRGB = R8bit/255
* GsRGB = G8bit/255
* BsRGB = B8bit/255

This project (written in react) get a form in which insert 2 color value in hexadecimal or rgb and calculate the contrast ratio. You cannot worry of the lighter and darker color because it is automatically calculated. Because the calculation is done on rgb color if you insert an hex I calculate rgb for you.

https://reactivegio.github.io/contrast-coefficient/
#### Enjoy it!
