import {Button, CustomSlider, IconDot, Input, Modal} from '@weddesign/components';
import {useTranslation} from 'react-i18next';
import {Text} from '@weddesign/themes';
import {getBudgetCategoryData} from '@weddesign-mobile/utils';
import React from 'react';

import {ModalContainer, ModalRow} from './styles';

type BudgetLimitEditionModalProps = {
    isVisible: boolean;
    onBackdropPress: () => void;
    modalValue: number;
    setModalValue: (value: number) => void;
    selectedItem: {categoryId: number; name: string; limit: number};
    handleOK: () => void;
    handleDelete: () => void;
    mainLimit: number;
};

const BudgetLimitEditionModal = ({
    isVisible,
    onBackdropPress,
    modalValue,
    setModalValue,
    selectedItem,
    handleOK,
    handleDelete,
    mainLimit,
}: BudgetLimitEditionModalProps) => {
    const {t} = useTranslation('budget');

    return (
        <Modal isVisible={isVisible} onBackdropPress={onBackdropPress}>
            <ModalContainer>
                <Text.SemiBold size={20}>{t('Ustaw limit')}</Text.SemiBold>
                <ModalRow>
                    {selectedItem ? (
                        (() => {
                            const data = getBudgetCategoryData(
                                selectedItem ? selectedItem.categoryId : 1,
                            );
                            return (
                                <IconDot
                                    color={data.color}
                                    Icon={data.icon}
                                ></IconDot>
                            );
                        })()
                    ) : (
                        <Text.SemiBold>{t('total') + ':'}</Text.SemiBold>
                    )}
                    <Input
                        // eslint-disable-next-line react-native/no-inline-styles
                        style={{width: '80%'}}
                        handleChange={(v) => {
                            const numericValue = v ? Number(v) : 0;
                            setModalValue(numericValue);
                        }}
                        value={modalValue && modalValue.toString()}
                        placeholder={t('Ustaw limit')}
                        inputMode={'numeric'}
                        multiline={false}
                        maxLength={12}
                        onFocus={() => console.log('focus')}
                        onBlur={() => console.log('blur')}
                    />
                </ModalRow>
                <CustomSlider
                    min={0}
                    max={mainLimit || 100000}
                    step={1000}
                    value={modalValue}
                    initialValue={modalValue}
                    onValueChange={(value) => {
                        setModalValue(value);
                    }}
                    label="Ustaw limit"
                    unit="$"
                />
                <ModalRow>
                    <Button
                        // eslint-disable-next-line react-native/no-inline-styles
                        style={{width: '50%'}}
                        variant="primary"
                        onPress={handleOK}
                    >
                        {t('OK')}
                    </Button>
                    <Button
                        // eslint-disable-next-line react-native/no-inline-styles
                        style={{width: '50%'}}
                        variant="secondaryFilled"
                        onPress={handleDelete}
                    >
                        {t('USUŃ LIMIT')}
                    </Button>
                </ModalRow>
            </ModalContainer>
        </Modal>
    );
};

export default BudgetLimitEditionModal;
