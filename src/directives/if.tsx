import { FunctionalComponent } from '@stencil/core';

export const If: FunctionalComponent<{
  condition: boolean | (() => boolean);
}> = ({ condition: value }, children) => {
  if (typeof value === 'function') {
    return value() ? children : null;
  } else {
    return value ? children : null;
  }
};
