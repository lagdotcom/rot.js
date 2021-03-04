var o = {
	fontSize: 20,
	width: 30,
	height: 18,
	forceSquareRatio: true,
};
var d = new ROT.Display(o);
document.body.appendChild(d.getContainer());

for (var i = 0; i < o.width; i++) {
	for (var j = 0; j < o.height; j++) {
		if (!i || !j || i + 1 == o.width || j + 1 == o.height) {
			d.draw(i, j, "#", "gray");
		} else {
			d.draw(i, j, ".", "#666");
		}
	}
}
d.draw(o.width >> 1, o.height >> 1, "@", "goldenrod");

var smallo = {
	fontSize: 10,
	width: 60,
	height: 40,
	context: d.getContainer().getContext("2d"),
	forceSquareRatio: true,
};
var d2 = new ROT.Display(smallo);
d2.drawText(
	2,
	36,
	"%c{white}An example of a message log half the size of the main tiles. They share the same canvas!"
);

d2.drawText(29, 17, "%b{black}****");
