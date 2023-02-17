import { FC, ReactElement, useEffect, useState } from 'react';
import { CardHome } from '../../app/components/CardHome';
import { Loading } from '../../app/components/Loading';
import { useAppDispatch } from '../../app/store/index';
import customAxiosApp from '../../shared/axiosConfig';

interface Stats {
  contCampanas: number;
  contPromociones: number;
  contReglas: number;
  contRestricciones: number;
  contTiendas: number;
  contUsuarios: number;
}

export const HomePage: FC = (): ReactElement => {
  const [stats, setStats] = useState<Stats>();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const getInitialStats = async () => {
    try {
      setLoading(true);
      const response = await customAxiosApp.get('contadorEntidades');
      if (response.status === 200) {
        setStats(response.data);
      }
    } catch (err: any) {
      // dispatch(
      //   showMessage({
      //     severity: 'error',
      //     summary: err.response?.data.message,
      //   })
      // );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    void getInitialStats();
  }, []);

  return (
    <div className="grid">
      <Loading show={loading} />
      <div className="col-4">
        <CardHome
          type={'campaings'}
          label={'campañas'}
          color={'blue'}
          icon={'pi-megaphone'}
          total={stats?.contCampanas}
        />
      </div>
      <div className="col-4">
        <CardHome
          label={'promociones'}
          type={'promotions'}
          color={'green'}
          icon={'pi-tags'}
          total={stats?.contPromociones}
        />
      </div>
      {/* <div className="col-4">
        <CardHome
          type={'rules'}
          label={'reglas'}
          color={'cyan'}
          icon={'pi-delete-left'}
          total={918}
        />
      </div>
      <div className="col-4 mt-3">
        <CardHome
          label={'restricciones'}
          type={'restrictions'}
          color={'red'}
          icon={'pi-ban'}
          total={16742}
        />
      </div> */}
      <div className="col-4">
        <CardHome
          label={'tiendas'}
          type={'store'}
          color={'orange'}
          icon={'pi-gift'}
          total={stats?.contTiendas}
        />
      </div>
      <div className="col-4 mt-3">
        <CardHome
          label={'usuarios'}
          type={'users'}
          color={'indigo'}
          icon={'pi-users'}
          total={stats?.contUsuarios}
        />
      </div>
      {/* <div className="col-4 mt-3"> */}
      {/*  <CardHome */}
      {/*    label={'estadísticas'} */}
      {/*    type={'estadísticas'} */}
      {/*    color={'purple'} */}
      {/*    icon={'pi-chart-bar'} */}
      {/*  /> */}
      {/* </div> */}
    </div>
  );
};
