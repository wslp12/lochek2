import { Reservation } from '../recoil/reservation.state';

interface IModalDefaultProps {
  isAutoCloseBackgroundClick?: boolean;
  closeModal?: () => void;
}

type IModalProps<T = unknown> = IModalDefaultProps & T;

type ReservationModalProps = IModalProps<Reservation>;
type AddUserModalProps = IModalProps;


export type { IModalProps, ReservationModalProps, AddUserModalProps };
