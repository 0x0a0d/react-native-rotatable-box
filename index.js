import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { Animated } from 'react-native'
import { RotationGestureHandler, State } from 'react-native-gesture-handler'

/**
 * @type {import('./index').ReactNativeRotatableBox}
 */
export const ReactNativeRotatableBox = forwardRef((props, ref) => {
  const {
    onHandlerStateChange,
    simultaneousHandlers,
    style,
    viewProps = {},
    useNativeDriver = true,
    initialValue = 0
  } = props

  useImperativeHandle(ref, () => ({
    getRotate: () => lastRotate.current
  }))

  const refGesture = useRef()
  const refViewContainer = useRef()

  const lastRotate = useRef(initialValue)
  const rotate = new Animated.Value(lastRotate.current ?? 0)
  const rotateStr = rotate.interpolate({
    inputRange: [-100, 100],
    outputRange: ['-100rad', '100rad'],
  })

  useEffect(() => {
    if (Array.isArray(simultaneousHandlers)) {
      simultaneousHandlers.includes(refGesture) || simultaneousHandlers.push(refGesture)
    }
  }, [simultaneousHandlers])

  return (
    <RotationGestureHandler
      ref={refGesture}
      simultaneousHandlers={simultaneousHandlers}
      onGestureEvent={Animated.event(
        [{ nativeEvent: { rotation: rotate }}],
        { useNativeDriver: useNativeDriver }
      )}
      onHandlerStateChange={event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
          lastRotate.current += event.nativeEvent.rotation
          rotate.setOffset(lastRotate.current)
          rotate.setValue(0)
        }
        if (typeof onHandlerStateChange === 'function') {
          onHandlerStateChange(event)
        }
      }}
    >
      <Animated.View
        ref={refViewContainer}
        style={[
          {
            flex: 1,
            transform: [
              // { perspective: 300 },
              { rotate: rotateStr },
            ],
          },
          style,
        ]}
        {...viewProps}
      >
        {props.children}
      </Animated.View>
    </RotationGestureHandler>
  )
})
