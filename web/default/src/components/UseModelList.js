import React, { useEffect, useState } from 'react';
import { Header, Message, Label } from 'semantic-ui-react';
import { API, copy, showError, showSuccess } from '../helpers';

const UseModelList = () => {

  const [models, setModels] = useState([]);
  
  const loadModels = async () => {
    let res = await API.get(`/api/user/available_models`);
    const { success, message, data } = res.data;
    if (success) {
      setModels(data);
      console.log(data);
    } else {
      showError(message);
    }
  };
  
  const copyText = async (text) => {
    if (await copy(text)) {
      showSuccess('已复制：' + text);
    } else {
      showError('无法复制到剪贴板，请手动复制：' + text);
    }
  };

  useEffect(() => {
    loadModels().then();
  }, []);

  return (
    <div style={{ lineHeight: '30px' }}>
      <Header as='h3'>下列是您可用的模型</Header>
      <Message>
        注意，此处的可用模型不代表 Hent AI 全部模型，仅列出您可以使用的模型。可联系管理员获得全部模型使用权。
      </Message>
      <div>
        {models.map((model) => (
          <Label key={model} onClick={() => {
            copyText(model);
          }}>
            {model}
          </Label>
        ))}
      </div>
    </div>
  );
};

export default UseModelList;
