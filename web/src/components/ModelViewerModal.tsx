import { Button, Modal } from 'semantic-ui-react';
import React, { FC, ReactElement, Suspense } from 'react';

interface ModelViewerModalProps {
    openText: string;
    model: string;
    title: string;
}

const ModelViewer = React.lazy(() => import('./'));

export const ModelViewerModal: FC<ModelViewerModalProps> = ({
    model,
    openText,
    title,
}: ModelViewerModalProps): ReactElement => (
    <Modal trigger={<Button color={'purple'}>{openText}</Button>}>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content>
            <Suspense fallback={<div>Loading...</div>}>
                <ModelViewer model={model} />
            </Suspense>
        </Modal.Content>
    </Modal>
);
