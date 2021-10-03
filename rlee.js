let fs = require("fs");
let arg = process.argv;
let i = 0, n = 1;
let inText;
let out = '';
let out2 = ''; 

fs.readFile(arg[2], (err, data) => {
	if (err){
		console.error(err);
		return;
	}
	inText = data.toString();
	console.log('input.txt:' + inText);
	while (i < inText.length) {
		while (inText.charAt(i) == inText.charAt(i + n))
			n++;
		let s = n;
		while (n > 255) {
			out += "#" + String.fromCharCode(255) + inText.charAt(i);
			n -= 255;
		}if (n >= 4) 
			out += "#" + String.fromCharCode(n) + inText.charAt(i);
		else if (inText.charAt(i) == "#")
				out += "#" + String.fromCharCode(n) + inText.charAt(i);
		else {
			let v = 0;
			while (v < n) {
				out += inText.charAt(i);
				v += 1;
			}
		}
		i += s;
		n = 1;
	}
	console.log('code.txt:' + out);
	fs.writeFile('code.txt', out, (err) => {
		if (err){
			console.err(err);
			return;
		}
	});
	i = 0;
	while (i < out.length) {
		if (out[i] == "#") {
			for (w = 0; w < out[i + 1].charCodeAt(0); w++) 
				out2 += out[i + 2];
			i += 3;
		}else {
			out2 += out[i];
			i += 1;
		}
	}
	console.log('dcode.txt:' + out2);
	fs.writeFile('decode.txt', out2, (err) => {
		if (err){
			console.err(err);
			return;
		}
	});
}); 