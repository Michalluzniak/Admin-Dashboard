export const useApiFilter = () => {
  //

  type ApiListProps = {
    name: string;
    dial_code: string;
    flag: string;
    code: string;
  };

  const getApiList = (apiList: ApiListProps[], inputVal: string) => {
    console.log(apiList);
    let res = apiList.filter((listElement: ApiListProps) => {
      return listElement.name.toLowerCase().includes(inputVal.toLowerCase());
    });
    return res;
  };

  return [getApiList];
};
