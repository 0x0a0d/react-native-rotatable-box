import * as React from 'react'
import { PinchGestureHandlerProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers'
import { ViewProps } from 'react-native'

type ReactNativeRotatableBoxRef = {
}

export type ReactNativeRotatableBoxBaseProps = {
  style?: object
  viewProps?: ViewProps
  /** default is { x : 0, y: 0 } */
  initialValue?: number
  /** default is true */
  useNativeDriver?: boolean
} & Pick<PinchGestureHandlerProps, 'simultaneousHandlers' | 'onHandlerStateChange'>

export type ReactNativeRotatableBoxProps = React.PropsWithoutRef<ReactNativeRotatableBoxBaseProps> & React.RefAttributes<ReactNativeRotatableBoxRef>
export const ReactNativeRotatableBox: React.ForwardRefExoticComponent<ReactNativeRotatableBoxProps>
