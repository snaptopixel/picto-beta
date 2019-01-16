/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import './stencil.core';

import '@stencil/router';
import '@stencil/state-tunnel';
import {
  EventEmitter,
} from './stencil.core';


export namespace Components {

  interface PictoCode {
    /**
    * Language for highlighting
    */
    'lang': string;
    /**
    * Source code as a string
    */
    'source': string;
  }
  interface PictoCodeAttributes extends StencilHTMLAttributes {
    /**
    * Language for highlighting
    */
    'lang'?: string;
    /**
    * Source code as a string
    */
    'source'?: string;
  }

  interface PictoGraph {}
  interface PictoGraphAttributes extends StencilHTMLAttributes {}

  interface PictoGraphIndex {
    'menu': IMenu;
  }
  interface PictoGraphIndexAttributes extends StencilHTMLAttributes {
    'menu'?: IMenu;
  }

  interface PictoIcon {
    'name': string;
    'styleType': 'solid' | 'regular';
  }
  interface PictoIconAttributes extends StencilHTMLAttributes {
    'name'?: string;
    'styleType'?: 'solid' | 'regular';
  }

  interface PictoMarkdown {
    /**
    * The markdown to be rendered
    */
    'source': string;
    'url': string;
  }
  interface PictoMarkdownAttributes extends StencilHTMLAttributes {
    /**
    * The markdown to be rendered
    */
    'source'?: string;
    'url'?: string;
  }

  interface PictoMenu {
    'options': Array<IMenu | ILink>;
  }
  interface PictoMenuAttributes extends StencilHTMLAttributes {
    'onLinkClicked'?: (event: CustomEvent<ILink>) => void;
    'options'?: Array<IMenu | ILink>;
  }

  interface PictoPreviewEvents {
    'events': Array<{ name: string; value: any }>;
  }
  interface PictoPreviewEventsAttributes extends StencilHTMLAttributes {
    'events'?: Array<{ name: string; value: any }>;
  }

  interface PictoPreview {
    'source': string;
  }
  interface PictoPreviewAttributes extends StencilHTMLAttributes {
    'source'?: string;
  }

  interface PictoScrollarea {}
  interface PictoScrollareaAttributes extends StencilHTMLAttributes {}

  interface PictoStyled {}
  interface PictoStyledAttributes extends StencilHTMLAttributes {}
}

declare global {
  interface StencilElementInterfaces {
    'PictoCode': Components.PictoCode;
    'PictoGraph': Components.PictoGraph;
    'PictoGraphIndex': Components.PictoGraphIndex;
    'PictoIcon': Components.PictoIcon;
    'PictoMarkdown': Components.PictoMarkdown;
    'PictoMenu': Components.PictoMenu;
    'PictoPreviewEvents': Components.PictoPreviewEvents;
    'PictoPreview': Components.PictoPreview;
    'PictoScrollarea': Components.PictoScrollarea;
    'PictoStyled': Components.PictoStyled;
  }

  interface StencilIntrinsicElements {
    'picto-code': Components.PictoCodeAttributes;
    'picto-graph': Components.PictoGraphAttributes;
    'picto-graph-index': Components.PictoGraphIndexAttributes;
    'picto-icon': Components.PictoIconAttributes;
    'picto-markdown': Components.PictoMarkdownAttributes;
    'picto-menu': Components.PictoMenuAttributes;
    'picto-preview-events': Components.PictoPreviewEventsAttributes;
    'picto-preview': Components.PictoPreviewAttributes;
    'picto-scrollarea': Components.PictoScrollareaAttributes;
    'picto-styled': Components.PictoStyledAttributes;
  }


  interface HTMLPictoCodeElement extends Components.PictoCode, HTMLStencilElement {}
  var HTMLPictoCodeElement: {
    prototype: HTMLPictoCodeElement;
    new (): HTMLPictoCodeElement;
  };

  interface HTMLPictoGraphElement extends Components.PictoGraph, HTMLStencilElement {}
  var HTMLPictoGraphElement: {
    prototype: HTMLPictoGraphElement;
    new (): HTMLPictoGraphElement;
  };

  interface HTMLPictoGraphIndexElement extends Components.PictoGraphIndex, HTMLStencilElement {}
  var HTMLPictoGraphIndexElement: {
    prototype: HTMLPictoGraphIndexElement;
    new (): HTMLPictoGraphIndexElement;
  };

  interface HTMLPictoIconElement extends Components.PictoIcon, HTMLStencilElement {}
  var HTMLPictoIconElement: {
    prototype: HTMLPictoIconElement;
    new (): HTMLPictoIconElement;
  };

  interface HTMLPictoMarkdownElement extends Components.PictoMarkdown, HTMLStencilElement {}
  var HTMLPictoMarkdownElement: {
    prototype: HTMLPictoMarkdownElement;
    new (): HTMLPictoMarkdownElement;
  };

  interface HTMLPictoMenuElement extends Components.PictoMenu, HTMLStencilElement {}
  var HTMLPictoMenuElement: {
    prototype: HTMLPictoMenuElement;
    new (): HTMLPictoMenuElement;
  };

  interface HTMLPictoPreviewEventsElement extends Components.PictoPreviewEvents, HTMLStencilElement {}
  var HTMLPictoPreviewEventsElement: {
    prototype: HTMLPictoPreviewEventsElement;
    new (): HTMLPictoPreviewEventsElement;
  };

  interface HTMLPictoPreviewElement extends Components.PictoPreview, HTMLStencilElement {}
  var HTMLPictoPreviewElement: {
    prototype: HTMLPictoPreviewElement;
    new (): HTMLPictoPreviewElement;
  };

  interface HTMLPictoScrollareaElement extends Components.PictoScrollarea, HTMLStencilElement {}
  var HTMLPictoScrollareaElement: {
    prototype: HTMLPictoScrollareaElement;
    new (): HTMLPictoScrollareaElement;
  };

  interface HTMLPictoStyledElement extends Components.PictoStyled, HTMLStencilElement {}
  var HTMLPictoStyledElement: {
    prototype: HTMLPictoStyledElement;
    new (): HTMLPictoStyledElement;
  };

  interface HTMLElementTagNameMap {
    'picto-code': HTMLPictoCodeElement
    'picto-graph': HTMLPictoGraphElement
    'picto-graph-index': HTMLPictoGraphIndexElement
    'picto-icon': HTMLPictoIconElement
    'picto-markdown': HTMLPictoMarkdownElement
    'picto-menu': HTMLPictoMenuElement
    'picto-preview-events': HTMLPictoPreviewEventsElement
    'picto-preview': HTMLPictoPreviewElement
    'picto-scrollarea': HTMLPictoScrollareaElement
    'picto-styled': HTMLPictoStyledElement
  }

  interface ElementTagNameMap {
    'picto-code': HTMLPictoCodeElement;
    'picto-graph': HTMLPictoGraphElement;
    'picto-graph-index': HTMLPictoGraphIndexElement;
    'picto-icon': HTMLPictoIconElement;
    'picto-markdown': HTMLPictoMarkdownElement;
    'picto-menu': HTMLPictoMenuElement;
    'picto-preview-events': HTMLPictoPreviewEventsElement;
    'picto-preview': HTMLPictoPreviewElement;
    'picto-scrollarea': HTMLPictoScrollareaElement;
    'picto-styled': HTMLPictoStyledElement;
  }


}
