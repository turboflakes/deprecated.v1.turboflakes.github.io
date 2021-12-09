export const clearView = () => ({
  type: `CLEAR_VIEW`
})

export const scrollIntoView = (view) => ({
  type: `SCROLL_INTO_VIEW`,
  view
})

export const enableScroll = () => ({
  type: `ENABLE_SCROLL`
})

export const disableScroll = () => ({
  type: `DISABLE_SCROLL`
})