import React, { ClassAttributes, ComponentClass } from "react";
import ConnectManager from "./ConnectManager";

interface StopTrackingProps {
  stopTracking: () => void;
}

const StopTracking = ({ stopTracking }: StopTrackingProps) => {
  stopTracking();
  return null;
};

type GetProps<C> = C extends React.ComponentType<infer P>
  ? C extends ComponentClass<P>
    ? ClassAttributes<InstanceType<C>> & P
    : P
  : never;

export const connect = <T extends React.ComponentType<GetProps<T>>>(Component: T): T => {
  class Connect extends React.Component<GetProps<T>> {
    timeout = null;
    componentRender = () => {
      if (!this.timeout) {
        this.timeout = setTimeout(() => {
          this.forceUpdate();
          this.timeout = null;
        }, 0);
      }
    };

    componentWillUnmount = () => {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      ConnectManager.removeTracking(this.componentRender);
    };

    render() {
      ConnectManager.startTracking(this.componentRender);

      return [
        // @ts-ignore
        <Component {...this.props} />,
        <StopTracking stopTracking={() => ConnectManager.stopTracking()} />,
      ];
    }
  }

  // @ts-ignore
  return Connect;
};
