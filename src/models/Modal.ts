import React from 'react';

interface IModalProps {
  isAutoCloseBackgroundClick?: boolean;
}

type IModal<T extends IModalProps = IModalProps> = (props: IModalProps & T) => React.ReactElement;

type ILoginModal = IModal;

export type { IModal, ILoginModal, IModalProps };
