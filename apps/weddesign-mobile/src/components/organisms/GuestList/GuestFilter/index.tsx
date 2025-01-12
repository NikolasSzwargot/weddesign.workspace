import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {useRouting} from '@weddesign-mobile/components';
import {BackgroundEllipse, Button, Header} from '@weddesign/components';
import {Colors, HomeRoutes} from '@weddesign/enums';
import {Text} from '@weddesign/themes';
import {useTranslation} from 'react-i18next';
import {GuestFiltersDto} from '@shared/dto';
import {CheckBox} from 'react-native-elements';

import {
    Container,
    FormInputWrapper,
    GuestFormWrapper,
    InputRow,
    Row,
} from './styles';

const GuestForm = () => {
    const {router} = useRouting();
    const {t} = useTranslation('guestList');
    const {control, handleSubmit, setValue} = useForm<GuestFiltersDto>({
        defaultValues: {
            guestStatusId: undefined,
            overnight: undefined,
            canGetThere: undefined,
            isChild: undefined,
            isCompanion: undefined,
            isVege: undefined,
        },
    });

    const filter: GuestFiltersDto = router.location.state;
    React.useEffect(() => {
        if (filter) {
            setValue('guestStatusId', filter.guestStatusId);
            setValue('overnight', filter.overnight);
            setValue('canGetThere', filter.canGetThere);
            setValue('isChild', filter.isChild);
            setValue('isCompanion', filter.isCompanion);
            setValue('isVege', filter.isVege);
        }
    }, [filter, setValue]);

    const handleSave = (data: GuestFiltersDto) => {
        console.log(data);
        // router.navigate(GuestListRoutes.LIST, data);
    };

    return (
        <Container>
            <BackgroundEllipse variant={'guests'} />
            <GuestFormWrapper>
                <Header onTitlePress={() => router.navigate(HomeRoutes.HOME)} />
                <FormInputWrapper>
                    <InputRow>
                        {/*<Controller*/}
                        {/*    name="guestStatusId"*/}
                        {/*    control={control}*/}
                        {/*    render={({field: {onChange, value}}) => (*/}
                        {/*        //@TODO: dropdown*/}
                        {/*        <Input*/}
                        {/*            value={value}*/}
                        {/*            handleChange={onChange}*/}
                        {/*            placeholder={t('guestForm.firstName')}*/}
                        {/*            inputMode={'text'}*/}
                        {/*            maxLength={10}*/}
                        {/*        />*/}
                        {/*    )}*/}
                        {/*/>*/}
                    </InputRow>

                    <Row>
                        <Controller
                            name="overnight"
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <CheckBox
                                    checked={value}
                                    onPress={() =>
                                        onChange(value ? undefined : true)
                                    }
                                    checkedColor={Colors.LightBlue}
                                />
                            )}
                        />
                        <Text.Regular>{t('guestForm.accommodation')}</Text.Regular>
                    </Row>

                    <Row>
                        <Controller
                            name="canGetThere"
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <CheckBox
                                    checked={value}
                                    onPress={() =>
                                        onChange(value ? undefined : true)
                                    }
                                    checkedColor={Colors.LightBlue}
                                />
                            )}
                        />
                        <Text.Regular>{t('guestForm.transport')}</Text.Regular>
                    </Row>

                    <Row>
                        <Controller
                            name="isChild"
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <CheckBox
                                    checked={value}
                                    onPress={() =>
                                        onChange(value ? undefined : true)
                                    }
                                    checkedColor={Colors.LightBlue}
                                />
                            )}
                        />
                        <Text.Regular>{t('guestForm.child')}</Text.Regular>
                    </Row>

                    <Row>
                        <Controller
                            name="isVege"
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <CheckBox
                                    checked={value}
                                    onPress={() =>
                                        onChange(value ? undefined : true)
                                    }
                                    checkedColor={Colors.LightBlue}
                                />
                            )}
                        />
                        <Text.Regular>{t('guestForm.vege')}</Text.Regular>
                    </Row>

                    <Button onPress={handleSubmit(handleSave)}>
                        {t('guestForm.save')}
                    </Button>
                </FormInputWrapper>
            </GuestFormWrapper>
        </Container>
    );
};

export default GuestForm;
