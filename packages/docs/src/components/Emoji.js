import React from 'react';

const Emoji = React.forwardRef(
  ({ children, ariaLabel = 'Emoji', ...restProps }, ref) => (
    <span ref={ref} role="img" aria-label={ariaLabel} {...restProps}>
      {children}
    </span>
  )
);

export default Emoji;
