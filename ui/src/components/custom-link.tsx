import type { LinkProps } from '@mui/material'
import { Link } from '@mui/material'
import type { LinkComponent } from '@tanstack/react-router'
import { createLink } from '@tanstack/react-router'
import { forwardRef } from 'react'

interface MUILinkProps extends LinkProps {
  // Add any additional props you want to pass to the Link
}

const MUILinkComponent = forwardRef<HTMLAnchorElement, MUILinkProps>(
  (props, ref) => <Link ref={ref} {...props} />,
)

const CreatedLinkComponent = createLink(MUILinkComponent)

export const CustomLink: LinkComponent<typeof MUILinkComponent> = (props) => {
  return <CreatedLinkComponent preload={'intent'} {...props} />
}