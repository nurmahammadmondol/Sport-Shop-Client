import React from 'react';
import Banner from '../Header/Banner/Banner';
import Collection_H from './HanpickedCollection/Collection_H';
import Collection_T from './TrendingCollection/Collection_T';
import { Helmet } from 'react-helmet';

const ShowAll = () => {
  return (
    <div>
      <div>
        <Helmet>
          <title>ProPlay Accessories || Home</title>
        </Helmet>
      </div>
      <div>
        <Banner></Banner>
      </div>

      <div className="w-11/12 md:w-10/12 mx-auto my-10">
        <div className="">
          <Collection_H></Collection_H>
        </div>

        <div className="">
          <Collection_T></Collection_T>
        </div>
      </div>
    </div>
  );
};

export default ShowAll;
