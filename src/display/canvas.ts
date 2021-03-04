import Backend from "./backend.js";
import { DisplayOptions } from "./types.js";

export default abstract class Canvas extends Backend {
	_ctx: CanvasRenderingContext2D;
	fontStyle: string;

	constructor() {
		super();
		this._ctx = document
			.createElement("canvas")
			.getContext("2d") as CanvasRenderingContext2D;
		this.fontStyle = "";
	}

	schedule(cb: () => void) {
		requestAnimationFrame(cb);
	}
	getContainer() {
		return this._ctx.canvas;
	}

	setOptions(opts: DisplayOptions) {
		super.setOptions(opts);

		const style = opts.fontStyle ? `${opts.fontStyle} ` : ``;
		this.fontStyle = `${style} ${opts.fontSize}px ${opts.fontFamily}`;
		if (opts.context) this._ctx = opts.context;

		this._ctx.font = this.fontStyle;
		this._updateSize();

		this._ctx.font = this.fontStyle;
		this._ctx.textAlign = "center";
		this._ctx.textBaseline = "middle";
	}

	clear() {
		if (this._options.context) return;

		this._ctx.fillStyle = this._options.bg;
		this._ctx.fillRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
	}

	eventToPosition(x: number, y: number): [number, number] {
		let canvas = this._ctx.canvas;
		let rect = canvas.getBoundingClientRect();
		x -= rect.left;
		y -= rect.top;

		x *= canvas.width / rect.width;
		y *= canvas.height / rect.height;

		if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) {
			return [-1, -1];
		}

		return this._normalizedEventToPosition(x, y);
	}

	abstract _normalizedEventToPosition(x: number, y: number): [number, number];
	abstract _updateSize(): void;
}
