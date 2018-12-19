import * as React from 'react'
import * as Konva from 'konva'

export interface KonvaNodeProps {
  onMouseOver? (evt: any): void
  onMouseMove? (evt: any): void
  onMouseOut? (evt: any): void
  onMouseEnter? (evt: any): void
  onMouseLeave? (evt: any): void
  onMouseDown? (evt: any): void
  onMouseUp? (evt: any): void
  onWheel? (evt: any): void
  onClick? (evt: any): void
  onDblClick? (evt: any): void
  onTouchStart? (evt: any): void
  onTouchMove? (evt: any): void
  onTouchEnd? (evt: any): void
  onTap? (evt: any): void
  onDblTap? (evt: any): void
  onDragStart? (evt: any): void
  onDragMove? (evt: any): void
  onDragEnd? (evt: any): void
  onTransform? (evt: any): void
  onTransformStart? (evt: any): void
  onTransformEnd? (evt: any): void
  onContextMenu? (evt: any): void
}

export interface KonvaNodeComponent<
  Node extends Konva.Node,
  Props = Konva.NodeConfig
  // We use React.ClassAttributes to fake the 'ref' attribute. This will ensure
  // consumers get the proper 'Node' type in 'ref' instead of the wrapper
  // component type.
> extends React.SFC<Props & KonvaNodeProps & React.ClassAttributes<Node>> {
  getPublicInstance (): Node
  getNativeNode (): Node
  // putEventListener(type: string, listener: Function): void
  // handleEvent(event: Event): void
}

export interface KonvaContainerComponent<
  Container extends Konva.Container,
  Props = Konva.ContainerConfig
  // See comment inside KonvaNodeComponent if modifiying next line.
> extends React.SFC<Props & KonvaNodeProps & React.ClassAttributes<Container>> {
  // moveChild(prevChild, lastPlacedNode, nextIndex, lastIndex): void
  // createChild(child, afterNode, mountImage): void
  // removeChild(child, node): void
  // updateChildrenAtRoot(nextChildren, transaction): void
  // mountAndInjectChildrenAtRoot(children, transaction): void
  // updateChildren(nextChildren, transaction, context): void
  // mountAndInjectChildren(children, transaction, context): void
  // mountAndAddChildren(): void
}

export interface StageProps
  extends Konva.NodeConfig,
    Pick<
      React.HTMLProps<any>,
      'className' | 'role' | 'style' | 'tabIndex' | 'title'
    > {
  onContentMouseOver? (evt: any): void
  onContentMouseMove? (evt: any): void
  onContentMouseOut? (evt: any): void
  onContentMouseDown? (evt: any): void
  onContentMouseUp? (evt: any): void
  onContentClick? (evt: any): void
  onContentDblClick? (evt: any): void
  onContentTouchStart? (evt: any): void
  onContentTouchMove? (evt: any): void
  onContentTouchEnd? (evt: any): void
  onContentTap? (evt: any): void
  onContentDblTap? (evt: any): void
  onContentWheel? (evt: any): void
  onContentContextMenu? (evt: any): void
}

// Stage is the only real class because the others are stubs that only know how
// to be rendered when they are under stage. Since there is no real backing
// class and are in reality are a string literal we don't want users to actually
// try and use them as a type. By defining them as a variable with an interface
// consumers will not be able to use the values as a type or constructor.
// The down side to this approach, is that typescript thinks the type is a
// function, but if the user tries to call it a runtime exception will occur.
/** Stage */
export class Stage extends React.Component<StageProps & KonvaNodeProps> {
  getStage (): Konva.Stage
}

/** Containers */
export const Layer: KonvaContainerComponent<
  Konva.Layer,
  Konva.LayerConfig
>
export const FastLayer: KonvaContainerComponent<
  Konva.FastLayer,
  Konva.LayerConfig
>
export const Group: KonvaContainerComponent<Konva.Group>
export const Label: KonvaContainerComponent<Konva.Label>

/** Shapes */
export const Rect: KonvaNodeComponent<Konva.Rect, Konva.RectConfig>
export const Circle: KonvaNodeComponent<
  Konva.Circle,
  Konva.CircleConfig
>
export const Ellipse: KonvaNodeComponent<
  Konva.Ellipse,
  Konva.EllipseConfig
>
export const Wedge: KonvaNodeComponent<Konva.Wedge, Konva.WedgeConfig>
export const Transformer: KonvaNodeComponent<Konva.Transformer, Konva.TransformerConfig>
export const Line: KonvaNodeComponent<Konva.Line, Konva.LineConfig>
export const Sprite: KonvaNodeComponent<
  Konva.Sprite,
  Konva.SpriteConfig
>
export const Image: KonvaNodeComponent<Konva.Image, Konva.ImageConfig>
export const Text: KonvaNodeComponent<Konva.Text, Konva.TextConfig>
export const TextPath: KonvaNodeComponent<
  Konva.TextPath,
  Konva.TextPathConfig
>
export const Star: KonvaNodeComponent<Konva.Star, Konva.StarConfig>
export const Ring: KonvaNodeComponent<Konva.Ring, Konva.RingConfig>
export const Arc: KonvaNodeComponent<Konva.Arc, Konva.ArcConfig>
export const Tag: KonvaNodeComponent<Konva.Tag, Konva.TagConfig>
export const Path: KonvaNodeComponent<Konva.Path, Konva.PathConfig>
export const RegularPolygon: KonvaNodeComponent<
  Konva.RegularPolygon,
  Konva.RegularPolygonConfig
>
export const Arrow: KonvaNodeComponent<Konva.Arrow, Konva.ArrowConfig>
export const Shape: KonvaNodeComponent<Konva.Shape, Konva.ShapeConfig>
