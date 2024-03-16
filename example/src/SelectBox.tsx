import '../../src/style.css'

const userAffiliations = [{"id":"c7662045-150e-4af8-b12c-8316727b4a49","account":"vv@vv","fullName":"aaa ddd","096ad488-85ae-4fc0-80f2-678e7fc9d753":["c9bb2a22-2a4b-4310-8703-6cf9ac009bc8"]},{"id":"40c3fffd-1ddf-4556-b37d-78b035f31273","account":"","fullName":" "},{"id":"6ea30ec0-26a3-454e-94e0-c8c83c14cb48","account":"","fullName":" "},{"id":"733addb8-e6d5-4c9d-84ca-3f32964c6249","account":"","fullName":" "},{"id":"d586026b-be4c-4bef-9dcb-f98c78a406df","account":"","fullName":" "},{"id":"c4d54428-21be-4e58-8010-40f3e052cafb","account":"","fullName":" "},{"id":"5e03d25b-a119-4f61-b2c5-31c10f091fb0","account":"","fullName":" "},{"id":"0c99199c-516a-40f8-85cc-c65b9034cdfb","account":"","fullName":" "},{"id":"14d49482-c736-42fc-b5dd-5db698ba2699","account":"","fullName":" "},{"id":"8dbc73e4-5617-4cf8-9e7d-ceba6a911cfa","account":"","fullName":" "},{"id":"7f896afb-fe89-4c2f-bf0c-d83ec9d6930a","account":"","fullName":" "},{"id":"5064c030-61dd-4d37-b831-98e0d899df47","account":"","fullName":" "},{"id":"33fcfe1b-48a0-4061-9529-a73f25e89b77","account":"","fullName":" "},{"id":"1b2f2cbb-dfbc-4b15-9f11-cf430ade21ee","account":"","fullName":" "},{"id":"302b92c5-ddbf-422f-977f-75a9c0907f89","account":"","fullName":" "},{"id":"a8561d6d-4346-4647-8b05-738269679a98","account":"","fullName":" "},{"id":"5d0a7893-ffbc-47b1-a1a3-b0bbb2468a19","account":"","fullName":" "},{"id":"98caf0e9-294c-412b-bcf7-c2d103ef06a9","account":"","fullName":" "},{"id":"02990c01-059c-4983-ac78-a1236f98f9f0","account":"","fullName":" "},{"id":"0494246b-ba97-405f-a3c3-82d71cac2009","account":"","fullName":" "}] 
const departments = [{"id":"7bdcb590-3b1f-42b5-89f7-2b55d30d67fd","name":"aaa","code":"aa","isEnabled":true,"parentIds":[]},{"id":"d02c3eb7-aa7b-45a8-b353-e09cebc26396","name":"cccc","code":"cccc","isEnabled":true,"parentIds":["7bdcb590-3b1f-42b5-89f7-2b55d30d67fd"]},{"id":"","name":"sss","code":"sss","isEnabled":true,"parentIds":["7bdcb590-3b1f-42b5-89f7-2b55d30d67fd","d02c3eb7-aa7b-45a8-b353-e09cebc26396",""]}] 
const positions = [{"id":"f19f2341-5422-4c39-af0a-b2b790965c05","name":"aaaa","code":"aaaa","isEnabled":true,"isQualityManager":false,"competenceBrowseLevel":111},{"id":"51d086aa-1cda-4a8d-9773-a778cb55b0d8","name":"1","code":"1","isEnabled":true,"isQualityManager":false,"competenceBrowseLevel":243},{"id":"bb38f03f-c237-439b-819e-2a518cb869f1","name":"2","code":"2","isEnabled":true,"isQualityManager":false,"competenceBrowseLevel":444},{"id":"2e08387b-ce3c-44d2-84cd-e67ac42a074b","name":"3","code":"3","isEnabled":true,"isQualityManager":false,"competenceBrowseLevel":null},{"id":"c9bb2a22-2a4b-4310-8703-6cf9ac009bc8","name":"45","code":"45","isEnabled":true,"isQualityManager":false,"competenceBrowseLevel":null},{"id":"567f5ae4-e451-4a31-b809-4dffee66e319","name":"6","code":"6","isEnabled":true,"isQualityManager":false,"competenceBrowseLevel":null},{"id":"00a59349-640c-4a14-95ef-d35c0a671be9","name":"87","code":"87","isEnabled":true,"isQualityManager":false,"competenceBrowseLevel":null}]

const SelectBoxTest = () => {

    const selectColumn = useMemo(
        () =>
            createMultiSelectColumn<{ id: string; name: string }[]>({
                options: positions as { id: string; name: string }[],
                getValue: (item) => item.id,
                getLabel: (item) => item.name,
            }),
        [],
    );


    const [data, setData] = useState<any>(userAffiliations);
    const columns: Column<any>[] = [
        ...departments.map((department) => ({
            ...keyColumn<any>(department.id, selectColumn),
            title: department.name,
            minWidth: 240,
          }))
    ]
    return (
        <div
            style={{
                margin: '50px',
                padding: '50px',
                maxWidth: '900px',
                background: '#f3f3f3',
            }}
        >
            <DataSheetGrid value={data} onChange={setData} columns={columns} />
        </div>
    )


}

export default SelectBoxTest;



import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import cx from 'classnames';
import { MenuItem, Select } from '@mui/material';
import { CellComponent, CellProps, Column, DataSheetGrid, keyColumn } from '../../src';
import { useFirstRender } from '../../src/hooks/useFirstRender';

type MultiSelectColumnOptions<T extends any[]> = {
    placeholder?: string;
    alignRight?: boolean;
    // When true, data is updated as the user types, otherwise it is only updated on blur. Default to true
    continuousUpdates?: boolean;
    // Value to use when deleting the cell
    deletedValue?: T;
    // Parse what the user types
    parseUserInput?: (value: string) => T;
    // Format the value of the input when it is blurred
    formatBlurredInput?: (value: T) => string;
    // Format the value of the input when it gets focused
    formatInputOnFocus?: (value: T) => string;
    // Format the value when copy
    formatForCopy?: (value: T) => string;
    // Parse the pasted value
    parsePastedValue?: (value: string) => T;
    options?: T;
    getValue?: (item: T[number]) => any;
    getLabel?: (item: T[number]) => string;
};

type MultiSelectColumnData<T extends any[]> = {
    placeholder?: string;
    alignRight: boolean;
    continuousUpdates: boolean;
    parseUserInput: (value: string) => T;
    formatBlurredInput: (value: T) => string;
    formatInputOnFocus: (value: T) => string;
    options?: T;
    getValue?: (item: T[number]) => any;
    getLabel?: (item: T[number]) => string;
};

const MultiSelectComponent = React.memo<CellProps<any[], MultiSelectColumnData<any[]>>>(
    ({
        active,
        focus,
        rowData,
        setRowData,
        columnData: {
            placeholder,
            alignRight,
            formatInputOnFocus,
            formatBlurredInput,
            parseUserInput,
            continuousUpdates,
            options,
            getValue,
            getLabel,
        },
    }) => {
        const ref = useRef<HTMLInputElement>(null);
        const firstRender = useFirstRender();
        const [open, setOpen] = useState(false);
        // We create refs for async access so we don't have to add it to the useEffect dependencies
        const asyncRef = useRef({
            rowData,
            formatInputOnFocus,
            formatBlurredInput,
            setRowData,
            parseUserInput,
            continuousUpdates,
            firstRender,
            // Timestamp of last focus (when focus becomes true) and last change (input change)
            // used to prevent un-necessary updates when value was not changed
            focusedAt: 0,
            changedAt: 0,
            // This allows us to keep track of whether or not the user blurred the input using the Esc key
            // If the Esc key is used we do not update the row's value (only relevant when continuousUpdates is false)
            escPressed: false,
        });
        asyncRef.current = {
            rowData,
            formatInputOnFocus,
            formatBlurredInput,
            setRowData,
            parseUserInput,
            continuousUpdates,
            firstRender,
            // Keep the same values across renders
            focusedAt: asyncRef.current.focusedAt,
            changedAt: asyncRef.current.changedAt,
            escPressed: asyncRef.current.escPressed,
        };

        useLayoutEffect(() => {
            // When the cell gains focus we make sure to immediately select the text in the input:
            // - If the user gains focus by typing, it will replace the existing text, as expected
            // - If the user gains focus by clicking or pressing Enter, the text will be preserved and selected
            if (focus) {
                if (ref.current) {
                    // Make sure to first format the input
                    ref.current.value = asyncRef.current.formatInputOnFocus(asyncRef.current.rowData);
                    ref.current.focus();
                    setOpen(true);
                }

                // We immediately reset the escPressed
                asyncRef.current.escPressed = false;
                // Save current timestamp
                asyncRef.current.focusedAt = Date.now();
            }
            // When the cell looses focus (by pressing Esc, Enter, clicking away...) we make sure to blur the input
            // Otherwise the user would still see the cursor blinking
            else if (ref.current) {
                // Update the row's value on blur only if the user did not press escape (only relevant when continuousUpdates is false)
                if (
                    !asyncRef.current.escPressed &&
                    !asyncRef.current.continuousUpdates &&
                    !asyncRef.current.firstRender &&
                    // Make sure that focus was gained more than 10 ms ago, used to prevent flickering
                    asyncRef.current.changedAt >= asyncRef.current.focusedAt
                ) {
                    asyncRef.current.setRowData(asyncRef.current.parseUserInput(ref.current.value));
                }
                ref.current.blur();
            }
        }, [focus]);

        useEffect(() => {
            if (!focus && ref.current) {
                // On blur or when the data changes, format it for display
                ref.current.value = asyncRef.current.formatBlurredInput(rowData);
            }
        }, [focus, rowData]);

        return (
            <Select
                multiple
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                value={rowData ?? []}
                className={cx('dsg-input', alignRight && 'dsg-input-align-right')}
                placeholder={active ? placeholder : undefined}
                tabIndex={-1}
                ref={ref}
                style={{ pointerEvents: focus ? 'auto' : 'none' }}
                sx={{
                    px: 0,
                    '.MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '.MuiSelect-select': {
                        px: '10px',
                    },
                }}
                onChange={(e) => {
                    asyncRef.current.changedAt = Date.now();
                    if (continuousUpdates) {
                        setRowData(parseUserInput(e.target.value as string));
                    }
                }}
                onKeyDown={(e) => {
                    // Track when user presses the Esc key
                    if (e.key === 'Escape') {
                        asyncRef.current.escPressed = true;
                    }
                }}
            >
                {options?.map((option: any) => (
                    <MenuItem key={getValue?.(option)} value={getValue?.(option)} dense>
                        {getLabel?.(option)}
                    </MenuItem>
                ))}
            </Select>
        );
    },
);

MultiSelectComponent.displayName = 'MultiSelectComponent';

export const multiSelectColumn = createMultiSelectColumn();

export function createMultiSelectColumn<T extends any[] = { label: string; value: string }[]>({
    placeholder,
    alignRight = false,
    continuousUpdates = true,
    deletedValue = [] as unknown as T,
    parseUserInput = (value) => (value ?? []) as unknown as T,
    formatBlurredInput = (value) => String(value ?? ''),
    formatInputOnFocus = (value) => String(value ?? ''),
    formatForCopy = (value) => value.join(','),
    parsePastedValue = (value) => (value.replace(/[\n\r]+/g, ' ').split(',') || ([] as unknown)) as T,
    options,
    getValue = (item) => (item as any).value,
    getLabel = (item) => (item as any).label,
}: MultiSelectColumnOptions<T> = {}): Partial<Column<T, MultiSelectColumnData<T>, string>> {
    return {
        component: MultiSelectComponent as unknown as CellComponent<T, MultiSelectColumnData<T>>,
        columnData: {
            placeholder,
            alignRight,
            continuousUpdates,
            formatInputOnFocus,
            formatBlurredInput,
            parseUserInput,
            options,
            getValue,
            getLabel,
        },
        deleteValue: () => deletedValue,
        copyValue: ({ rowData }) => formatForCopy(rowData),
        pasteValue: ({ value }) => parsePastedValue(value),
        isCellEmpty: ({ rowData }) => rowData === null || rowData === undefined,
    };
}
