import React, { useEffect, useState } from "react"
import "./style.scss"

const AccessibleInput = () => {
	const [colorBg, setColorBg] = useState("")
	const [errorFormatBg, setErrorFormatBg] = useState(false)
	const [errorFormatFg, setErrorFormatFg] = useState(false)
	const [colorFg, setColorFg] = useState("")
	const [score, setScore] = useState(null)
    const [stoplight, setStoplight] = useState(null)

    useEffect(() => {
        let classColor;
        if(score < 3){
            classColor="red";
        }
        else if(score >= 4.5){
            classColor="green";
        }
        else {
            classColor="yellow";
        }
        setStoplight(classColor);
    }, [score])
    
    const calculateContrastCoefficient = (event) => {
        event.preventDefault();    
        // If it is an hexadecimal, I convert it into rgb
        const patternHex = /^(#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}))$/;        
        const rgbColorBg = patternHex.test(colorBg) ? hexToRgb(colorBg) : colorBg;
        const rgbColorFg = patternHex.test(colorFg) ? hexToRgb(colorFg) : colorFg;
        const rgbObjectBg = extractSRgbValuesInDecimalScale(rgbColorBg);
        const rgbObjectFg = extractSRgbValuesInDecimalScale(rgbColorFg);
        console.log("rgbObjectBg: ",rgbObjectBg);
        console.log("rgbObjectFg: ",rgbObjectFg);        
        const luminanceBG = (0.2126 * rgbObjectBg.r) + (0.7152 * rgbObjectBg.g) + (0.0722 * rgbObjectBg.b);
        const luminanceFG = (0.2126 * rgbObjectFg.r) + (0.7152 * rgbObjectFg.g) + (0.0722 * rgbObjectFg.b);
        console.log("luminanceBG: ",luminanceBG);
        console.log("luminanceFG: ",luminanceFG);
        const l1 = Math.max(luminanceBG, luminanceFG);
        const l2 = Math.min(luminanceBG, luminanceFG);
        console.log("l1: ",l1);
        console.log("l2: ",l2);
        setScore((l1 + 0.05) / (l2 + 0.05));        
    }

	const checkColorPattern = (event, setFunc) => {		
		const pattern =
			/^(#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})|rgb\(\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])\s*,\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])\s*,\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])\s*\))$/
		setFunc(pattern);
	}

    const extractSRgbValuesInDecimalScale = (rgb) => {        
        var match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if (match) {
            return {
                r: (match[1]/255 <= 0.03928) ? (match[1]/255)/12.92 : Math.pow(((match[1]/255)+0.055)/1.055, 2.4),
                g: (match[2]/255 <= 0.03928) ? (match[2]/255)/12.92 : Math.pow(((match[2]/255)+0.055)/1.055, 2.4),
                b: (match[3]/255) <= 0.03928 ? (match[3]/255)/12.92 : Math.pow(((match[3]/255)+0.055)/1.055, 2.4)
            };
        }
        return {};
    }

    const hexToRgb = (hexColor) => {  
        var r, g, b;
        if (hexColor.length === 4) {
          r = parseInt(hexColor[1] + hexColor[1], 16);
          g = parseInt(hexColor[2] + hexColor[2], 16);
          b = parseInt(hexColor[3] + hexColor[3], 16);
        } else {
          r = parseInt(hexColor.substring(1, 3), 16);
          g = parseInt(hexColor.substring(3, 5), 16);
          b = parseInt(hexColor.substring(5, 7), 16);
        }
      
        return "rgb(" + r + ", " + g + ", " + b + ")";
      }

	return (
		<div className="form-container">
			<form>
				<div>
					<label htmlFor="colorBg">Colore base:</label>
					<input
						className={errorFormatBg ? "error" : ""}
						title="Insert color rgb or hex"
						value={colorBg}
						aria-describedby="colorBg-desc"
						onChange={(event) => {
                            setColorBg(event.target.value);
                            checkColorPattern(event, (pattern) => {                                
		                        setErrorFormatBg(!pattern.test(event.target.value))
                            });
                        }}
						onFocus={() => setErrorFormatBg(false)}
						placeholder="Insert background color"
						required
						type="text"
						id="colorBg"
						name="colorBg"
					/>

					<small
						id="colorBg-desc"
						style={{ color: errorFormatBg ? "#8b0000" : "#333" }}
					>
						{
							"Insert color in format rgb(ie. rgb(256,256,256)) or hex(ie. #000 or #000000)"
						}
					</small>
				</div>
				<div style={{ margin: "20px 0" }}>
					<label htmlFor="colorFg">Colore base:</label>
					<input
						className={errorFormatFg ? "error" : ""}
						title="Inserisci colore rgb o hex"
						value={colorFg}
						aria-describedby="colorBg-desc"
						onChange={(event) => {
                            setColorFg(event.target.value);
                            checkColorPattern(event, (pattern) => {                                
		                        setErrorFormatFg(!pattern.test(event.target.value))
                            });
                        }
                        }
						onFocus={() => setErrorFormatFg(false)}
						placeholder="Insert text color"
						required
						type="text"
						id="colorFg"
						name="colorFg"
					/>

					<small
						id="colorFg-desc"
						style={{ color: errorFormatFg ? "#8b0000" : "#333" }}
					>
						{
							"Insert color in format rgb(ie. rgb(256,256,256)) or hex(ie. #000 or #000000)"
						}
					</small>
				</div>
                { !!colorBg && !!colorFg &&
				<input
					type="submit"
					value="CHECK CONTRAST"
					onClick={(event) => calculateContrastCoefficient(event)}
				/>
                }
			</form>
            {score &&
			<div className={`task-box ${stoplight}`}>
				<div className="description-box">CONTRAST COEFFICIENT</div>
				<div className="coefficient-value">{score}</div>
			</div>
            }
		</div>
	)
}

export default AccessibleInput
