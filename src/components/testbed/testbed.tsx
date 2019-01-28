import { Component, Event, EventEmitter, Method, Prop } from '@stencil/core';

@Component({
  tag: 'picto-testbed',
})
export class TestBed {
  /** A test event to demo logging */
  @Event() tested: EventEmitter<number>;

  /** A boolean prop w/no default */
  @Prop() boolProp: boolean;
  /** A number prop w/default */
  @Prop({ mutable: true }) numProp = 1234;
  /** A string prop w/default */
  @Prop() strProp = 'Hello World';
  /** An object prop w/no default */
  @Prop() objProp: { message: string };
  /** An arry prop w/no default */
  @Prop() arrProp: Array<{ message: string }>;
  /** A string union prop w/default */
  @Prop() unionProp: 'foo' | 'bar' | 'baz' = 'bar';

  /** Increments and returns the numProp property */
  @Method()
  async method(a?: string, b?: number, ...rest: any[]) {
    return this.numProp++;
  }

  render() {
    return (
      <picto-styled>
        <div class='box'>
          <h1 class='heading is-size-1'>{this.strProp}</h1>
          <span class='tag is-link is-rounded is-pulled-right'>
            {this.unionProp} {this.numProp}
          </span>
          <a
            class='button is-small'
            onClick={() => this.tested.emit(new Date().getTime())}
          >
            Emit @Event
          </a>
        </div>
      </picto-styled>
    );
  }
}
