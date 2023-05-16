import { FormProps } from '@/pages/SignUp';
import { FormEvent, useEffect, useRef } from 'react';
import signUpForm from '@/components/signup/SignUpForm.module.scss';
import { useUser } from '@/hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';

interface MemberFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  name: HTMLInputElement;
  age: HTMLInputElement; //value: string;
  occupation: HTMLInputElement;
  address: HTMLInputElement;
  addressDetail: HTMLInputElement;
  sex: HTMLSelectElement;
}

interface MemberForm extends HTMLFormElement {
  readonly elements: MemberFormElements;
}

const MemberForm = ({ sendSignUpData, openPostModal, roadAddress }: FormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { data: userData, isLoading } = useUser();
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent<MemberForm>) => {
    e.preventDefault();
    if (!e.currentTarget) return;
    const { name, age, sex, occupation, addressDetail } = e.currentTarget.elements;
    const nameValue = name.value;
    const ageValue = age.value;
    const sexValue = sex.value;
    const occupationValue = occupation.value;
    const address = (roadAddress + addressDetail.value).trim();

    sendSignUpData('');
  };

  // useEffect(() => {
  //   if (isLoading === false && !userData?.email) {
  //     navigate('/signin');
  //   }
  // }, [isLoading, userData]);

  if (isLoading) {
    return <div>로딩중</div>;
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className={signUpForm['form']}>
      <label htmlFor="email">이메일</label>
      <input name="email" type="email" value={userData?.email} readOnly />

      <label htmlFor="name">이름</label>
      <input name="name" type="text" />

      <label htmlFor="occupation">직업</label>
      <input name="occupation" type="text" />

      <label htmlFor="address">주소</label>
      <div className={signUpForm['address']}>
        <input
          name="address"
          type="text"
          placeholder="도로명주소"
          value={roadAddress}
          readOnly
          onFocus={openPostModal}
        />
        <button type="button" onClick={openPostModal}>
          <BiSearch size="1.5rem" color="inherit" />
        </button>
      </div>
      <label htmlFor="addressDetail">상세</label>
      <input name="addressDetail" type="text" placeholder="상세주소" />

      <div className={signUpForm['ageSex']}>
        <label htmlFor="age">나이</label>
        <input name="age" type="number" />
        <label htmlFor="sex">성별</label>
        <select name="sex">
          <option value="">선택</option>
          <option value="man">남성</option>
          <option value="woman">여성</option>
        </select>
      </div>

      <div className={signUpForm['footer']}>
        <button type="submit">제출</button>
      </div>
    </form>
  );
};

export default MemberForm;