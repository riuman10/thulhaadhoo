import { Drawer as BottomDrawer } from 'vaul';

type Props = {
  onOpenChange:any;
  drawerOpen : boolean,
  children : JSX.Element;
}

function Drawer({
  onOpenChange = () => {},
  drawerOpen = false,
  children = <></>,
} : Props) {
  return (
    <BottomDrawer.Root
      shouldScaleBackground={true}
      open={drawerOpen}
      onOpenChange={(x) => onOpenChange(x)}
    >
      <BottomDrawer.Portal>
        <BottomDrawer.Overlay className="fixed inset-0 bg-black/40" />
        <BottomDrawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex h-[93%] flex-col rounded-t-[10px] bg-zinc-100 focus:outline-none">
          {children}
        </BottomDrawer.Content>
      </BottomDrawer.Portal>
    </BottomDrawer.Root>
  );
}

export default Drawer;

