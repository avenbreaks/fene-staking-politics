export function SiteFooter() {
  return (
    <footer className="border-t py-4 md:py-6">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} Fene Staking Dashboard. All rights reserved.
        </p>
        <p className="text-center text-sm text-muted-foreground md:text-right">Built with Next.js and shadcn/ui</p>
      </div>
    </footer>
  )
}

