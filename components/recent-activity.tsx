export function RecentActivity() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
          <div className="w-2 h-2 rounded-full bg-primary" />
        </div>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Reward Received</p>
          <p className="text-sm text-muted-foreground">0.05 FNE from Validator #1289</p>
          <p className="text-xs text-muted-foreground">2 hours ago</p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
        </div>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Staked ETH</p>
          <p className="text-sm text-muted-foreground">10.0 FNE to Validator #5432</p>
          <p className="text-xs text-muted-foreground">1 day ago</p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
          <div className="w-2 h-2 rounded-full bg-primary" />
        </div>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Reward Received</p>
          <p className="text-sm text-muted-foreground">0.03 FNE from Validator #8734</p>
          <p className="text-xs text-muted-foreground">2 days ago</p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500/10">
          <div className="w-2 h-2 rounded-full bg-red-500" />
        </div>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Unstaked ETH</p>
          <p className="text-sm text-muted-foreground">5.0 FNE from Validator #1289</p>
          <p className="text-xs text-muted-foreground">5 days ago</p>
        </div>
      </div>
    </div>
  )
}

