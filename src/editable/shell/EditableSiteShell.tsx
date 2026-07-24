'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { EditableNavbar } from '@/editable/shell/EditableNavbar'
import { EditableFooter } from '@/editable/shell/EditableFooter'
import { EditablePageMotion } from '@/editable/shell/EditablePageMotion'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

export function EditableSiteShell({ children, className = '' }: { children: ReactNode; className?: string }) {
  const pathname = usePathname()
  // Nav is fixed over the hero on the home page; every other route gets a top
  // spacer so content clears the fixed header.
  const isHome = pathname === '/'
  return (
    <div className={`editable-site-root ${dc.shell.page} flex min-h-screen flex-col ${className}`}>
      <EditableNavbar />
      <div className={isHome ? '' : 'pt-[76px]'}>
        <EditablePageMotion>{children}</EditablePageMotion>
      </div>
      <EditableFooter />
    </div>
  )
}
