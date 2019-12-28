import { Button, Modal } from 'semantic-ui-react';
import { ModelViewer } from './';
import React, { FC, ReactElement } from 'react';

interface ModelViewerModalProps {
    openText: string;
    model: string;
    title: string;
}

export const ModelViewerModal: FC<ModelViewerModalProps> = ({
    model,
    openText,
    title,
}: ModelViewerModalProps): ReactElement => (
    <Modal trigger={<Button color={'purple'}>{openText}</Button>}>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content>
            <ModelViewer model={model} />
        </Modal.Content>
    </Modal>
);
