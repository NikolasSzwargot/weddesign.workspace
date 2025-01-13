import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useRouting} from '@weddesign-mobile/components';
import {
    BackgroundEllipse,
    DropdownSelect,
    Header,
    IconButton,
} from '@weddesign/components';
import {
    ApiRoutes,
    Colors,
    GuestListRoutes,
    GuestStatuses,
    HomeRoutes,
} from '@weddesign/enums';
import {Text} from '@weddesign/themes';
import {useTranslation} from 'react-i18next';
import {GuestFiltersDto} from '@shared/dto';
import {CheckBox} from 'react-native-elements';
import {TouchableOpacity} from 'react-native';
import {Icons} from '@weddesign/assets';
import {useQueryClient} from 'react-query';

import {
    CloseIcon,
    Container,
    FormInputWrapper,
    GuestFormWrapper,
    Row,
    StatusRow,
    TitleRow,
} from './styles';

const GuestFilter = () => {
    const {router} = useRouting();
    const {t} = useTranslation('guestList');
    const queryClient = useQueryClient();
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
        queryClient.invalidateQueries([ApiRoutes.GuestsGrouped]);
        queryClient.invalidateQueries([ApiRoutes.GuestsCount]);

        router.navigate(GuestListRoutes.LIST, data);
    };

    const handleReset = () => {
        setValue('guestStatusId', undefined);
        setValue('overnight', undefined);
        setValue('canGetThere', undefined);
        setValue('isChild', undefined);
        setValue('isCompanion', undefined);
        setValue('isVege', undefined);
    };

    const dropdownData = [
        {
            value: undefined,
            label: t('statusModal.none'),
        },
        ...Object.keys(GuestStatuses)
            .filter((key) => isNaN(Number(key)))
            .map((label) => ({
                value: GuestStatuses[label as keyof typeof GuestStatuses],
                label: t(`statusModal.${label.toLowerCase()}`),
            })),
    ];

    return (
        <Container>
            <BackgroundEllipse variant={'guests'} />
            <GuestFormWrapper>
                <Header onTitlePress={() => router.navigate(HomeRoutes.HOME)} />
                <FormInputWrapper>
                    <CloseIcon>
                        <IconButton
                            Icon={Icons.BlackX}
                            onPress={handleSubmit(handleSave)}
                        />
                    </CloseIcon>
                    <TitleRow>
                        <Text.Bold size={24}>{t('filter.filter')}</Text.Bold>
                        <TouchableOpacity onPress={handleReset}>
                            <Text.Regular style={{color: Colors.Pink}}>
                                {t('filter.reset')}
                            </Text.Regular>
                        </TouchableOpacity>
                    </TitleRow>

                    <Text.Bold size={16} style={{color: Colors.FilterGray}}>
                        {t('filter.status')}
                    </Text.Bold>

                    <StatusRow>
                        <Controller
                            name="guestStatusId"
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <DropdownSelect
                                    data={dropdownData}
                                    value={value}
                                    onChange={onChange}
                                    autoScroll={false}
                                />
                            )}
                        />
                    </StatusRow>

                    <Text.Bold size={16} style={{color: Colors.FilterGray}}>
                        {t('filter.options')}
                    </Text.Bold>

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
                </FormInputWrapper>
            </GuestFormWrapper>
        </Container>
    );
};

export default GuestFilter;
