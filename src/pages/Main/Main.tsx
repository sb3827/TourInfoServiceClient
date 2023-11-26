import { FC, useState, ReactNode } from 'react'
import { SearchInput } from '../../components'
import { Slider } from '../../components'
import { SliderItem } from '../../components/place/SliderItem';


type MainProps = {};

export const Main: FC<MainProps> = () => {
  const [searchValue, setSearchValue] = useState('');

  function onSearch(value: string) {
    setSearchValue(value);
    // 검색로직추가
  }



  return (
    <div>
      <div className="flex flex-col justify-center h-screen">
        <div className="m-8 text-3xl font-bold text-center">Logo</div>
        <div>
          <SearchInput
            value={searchValue}
            className="mb-10"
            onChange={onSearch}
          ></SearchInput>
        </div>
        <div>
          <label className="m-4 text-left block">MostLiked♥</label>
          <Slider>
            <SliderItem onClick={() => alert('상세페이지로 이동')}>
              <div>dummyContent1</div>
            </SliderItem>
            <SliderItem onClick={() => alert('상세페이지로 이동')}>
              <div>dummyContent2</div>
            </SliderItem>
          </Slider>

          <label className="m-4 text-left block">
            recently upload
          </label>
          <Slider>

          </Slider>

          <label className="m-4 text-left block">
            most reply
          </label>
          <Slider>

          </Slider>

          <label className="m-4 text-left block">
            mostLikedCourse♥
          </label>
          <Slider>

          </Slider>

          <label className="m-4 text-left block">
            follower posts
          </label>
          <Slider>

          </Slider>

          <label className="m-4 text-left block">
            ads
          </label>
          <Slider>

          </Slider>
        </div>
      </div>
    </div>
  );



}
