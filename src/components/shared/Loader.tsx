import { Spinner } from 'reactstrap';
import { LoaderProps } from '../../types/types';

export const Loader = ({ size = '3rem', position = 'absolute', top = '50%', left = '50%', className }: LoaderProps) => {
  return (
    <Spinner
      color='primary'
      style={{
        height: size,
        width: size,
        position: position,
        top: top,
        left: left,
      }}
      className={className}
    />
  );
};
