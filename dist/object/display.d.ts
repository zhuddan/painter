import type { MaybePoint } from '../position/point';
import { Point } from '../position/point';
import type { BaseStyle } from '../style/base-style';
/**
 * [单位矩阵变化](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/setTransform)
 */
export interface DisplayImpl {
    angle?: number;
    scale?: MaybePoint;
    skew?: MaybePoint;
    anchor?: MaybePoint;
    visible?: boolean;
}
export declare abstract class Display implements Required<DisplayImpl> {
    constructor();
    private _dirty;
    set dirty(value: boolean);
    get dirty(): boolean;
    abstract style: BaseStyle;
    private _visible;
    get visible(): boolean;
    set visible(value: boolean);
    private _angle;
    get angle(): number;
    set angle(value: number);
    get x(): number;
    set x(val: number);
    get y(): number;
    set y(val: number);
    position: Point;
    skew: Point;
    anchor: Point;
    scale: Point;
    onAdd(): void;
    onRemove(): void;
    abstract _render(ctx: CanvasRenderingContext2D): void;
    render(ctx: CanvasRenderingContext2D): void;
}
