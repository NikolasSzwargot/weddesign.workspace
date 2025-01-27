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
            <ModalContainer height={!selectedItem && '250px'}>
                <Text.SemiBold size={20}>{t('limitModal.setLimit')}</Text.SemiBold>
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
                        style={{width: '80%'}}
                        handleChange={(v) => {
                            const numericValue = v ? Number(v) : 0;
                            setModalValue(numericValue);
                        }}
                        value={modalValue && modalValue.toString()}
                        placeholder={t('limitModal.setLimit')}
                        inputMode={'numeric'}
                        multiline={false}
                        maxLength={12}
                    />
                </ModalRow>
                {selectedItem && (
                    <CustomSlider
                        min={0}
                        max={mainLimit || 100000}
                        step={1000}
                        value={modalValue}
                        initialValue={modalValue}
                        onValueChange={(value) => {
                            setModalValue(value);
                        }}
                        label={t('limitModal.setLimit')}
                        unit={t('currency')}
                    />
                )}
                <ModalRow>
                    <Button
                        style={{width: '50%'}}
                        variant="primary"
                        onPress={handleOK}
                    >
                        {t('OK')}
                    </Button>
                    <Button
                        style={{width: '50%'}}
                        variant="secondaryFilled"
                        onPress={handleDelete}
                    >
                        {t('limitModal.deleteLimit')}
                    </Button>
                </ModalRow>
            </ModalContainer>
        </Modal>
    );
};

export default BudgetLimitEditionModal;
