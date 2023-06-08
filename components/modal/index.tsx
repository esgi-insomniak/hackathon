import { Fragment } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

type ModalProps = {
    toggle: () => void;
    isShowing: boolean;
    content: JSX.Element
    title: string
    yesno?: boolean
    action?: () => void
};

export default function Modal({ toggle, isShowing, content, title, yesno, action }: ModalProps) {

    return (
        <Fragment>
            <Dialog
                open={isShowing}
                handler={toggle}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>{title}</DialogHeader>
                <DialogBody>
                    {content}
                </DialogBody>
                {yesno && (
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={toggle}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button variant="gradient" color="green" onClick={action}>
                            <span>Confirm</span>
                        </Button>
                    </DialogFooter>
                )}
            </Dialog>
        </Fragment>
    );
}