import React, { FC, ReactElement } from 'react';
import styles from '../styles/ModelViewer.module.scss';
import '@google/model-viewer';

interface ModelViewerProps {
    model: string;
}

export const ModelViewer: FC<ModelViewerProps> = function({ model }: ModelViewerProps): ReactElement {
    return <model-viewer class={styles.viewer} camera-controls={true} exposure={0.5} src={model} />;
};
