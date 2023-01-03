import React from 'react';

interface IModalProps {
  isAutoCloseBackgroundClick?: boolean;
  closeModal?: () => void;
}

type IModal<T extends IModalProps = IModalProps> = (props: IModalProps & T) => React.ReactElement;

type ILoginModal = IModal;
type IAddUserCharacterModal = IModal;

export type { IModal, ILoginModal, IModalProps, IAddUserCharacterModal };
