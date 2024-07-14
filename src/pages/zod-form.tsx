import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().nonempty('名前は必須入力です。').max(20, '名前は20文字以内にしてください。'),
  email: z.string().nonempty('メールアドレスは必須入力です。').email('メールアドレスの形式が不正です。'),
  gender: z.enum(['male', 'female']),
  memo: z.string().min(10, '備考は10文字以上にしてください。'),
  country: z.string().nonempty('国は必須選択です。'),
  agreeToTerms: z.boolean().refine(val => val, '利用規約に同意してください。')
});

type FormData = z.infer<typeof schema>;

export default function Form() {

  const defaultValues: FormData = {
    name: '山田太郎',
    email: 'admin@example.com',
    gender: 'male',
    memo: '',
    country: '',
    agreeToTerms: false
  };

  const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange'
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='formContainer' noValidate>
      <div className='formGroup'>
        <p className='formLabel'>名前<label className="requiredLabel">【必須】</label></p>
        <input id='name' type="text"
          {...register('name')}
        />
        <div className='errorMessage'>{errors.name?.message}</div>
      </div>

      <div className='formGroup'>
        <p className='formLabel'>性別<label className="requiredLabel">【必須】</label></p>
        <div className="radioFlex">
          <label>
            <input type="radio" value='male'
              {...register('gender')}
            />男性
          </label>
          <label>
            <input type="radio" value='female'
              {...register('gender')}
            />女性
          </label>
        </div>
        <div className='errorMessage'>{errors.gender?.message}</div>
      </div>

      <div className='formGroup'>
        <p className='formLabel'>メールアドレス<label className="requiredLabel">【必須】</label></p>
        <input type="email"
          {...register('email')}
        />
        <div className='errorMessage'>{errors.email?.message}</div>
      </div>

      <div className='formGroup'>
        <p className='formLabel'>備考<label className="requiredLabel">【必須】</label></p>
        <textarea id='memo'
          {...register('memo')}
        />
        <div className='errorMessage'>{errors.memo?.message}</div>
      </div>

      <div className='formGroup'>
        <p className='formLabel'>国<label className="requiredLabel">【必須】</label></p>
        <select id='country'
          {...register('country')}
        >
          <option value="">選択してください</option>
          <option value="japan">日本</option>
          <option value="usa">アメリカ</option>
          <option value="canada">カナダ</option>
          <option value="uk">イギリス</option>
        </select>
        <div className='errorMessage'>{errors.country?.message}</div>
      </div>

      <div className='formGroup checkAgree'>
        <label>
          <input type="checkbox"
            {...register('agreeToTerms')}
          />
          利用規約に同意する
        </label>
        <div className='errorMessage'>{errors.agreeToTerms?.message}</div>
      </div>

      <div className='formGroup'>
        <button type='submit' className='submitButton' disabled={!isValid}>送信</button>
      </div>
    </form>
  );
}
