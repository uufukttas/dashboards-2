import { FaCircleInfo } from 'react-icons/fa6';

const ListComponent = ({ componentValue, isLoading }: { componentValue: any; isLoading: boolean }) => {
  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-4 p-2">
        <p>Yükleniyor...</p>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <h2 className={'text-xl font-bold flex w-full justify-center items-center list-none'}>
        {componentValue?.widgetTitle}
      </h2>
      {componentValue?.listItemData.map((item: any) => {
        return (
          item.name &&
          item.data && (
            <li key={Object.keys(item)[0]} className="text-xl flex w-full justify-center items-center list-none">
              <div className="w-full h-1/6 description-container flex items-end text-xs px-4">
                <div className="w-full flex items-center justify-start">
                  <FaCircleInfo className="mx-2" />
                  <div className="w-full flex items-center justify-between text-lg">
                    <p>{item.name && item.data && item.name}</p>
                    <p>{item.name && item.data && item.data}</p>
                  </div>
                </div>
              </div>
            </li>
          )
        );
      })}
    </div>
  );
};

export default ListComponent;
