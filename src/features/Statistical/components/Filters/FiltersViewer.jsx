import { Box, Chip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
FilterViewer.propTypes = {
    filters: PropTypes.object.isRequired,
    onChange: PropTypes.func,
};

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexFlow: 'row wrap',
        padding: '0px 16px',
        alignItems: 'center',
        listStyle: 'none',
        margin: '16px 0px',
        '& > li': {
            pading: '8px',
            margin: 0,
            marginRight: '8px'
        },
    },
})

const FILTER_LIST = [
   
    {
        id: 1,
        getLabel: (filters) => `${filters.departmentLabel}`,
        isActive: () => true,
        isVisible: (filters) => filters.department,
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = {...filters}
            delete newFilters.department
            delete newFilters.departmentLabel
            return newFilters
        },
        onToggle: () => {}
    },
    {
        id: 2,
        getLabel: (filters) => `${filters.gender}`,
        isActive: () => true,
        isVisible: (filters) => filters.gender,
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = {...filters}
            delete newFilters.gender
            return newFilters
        },
        onToggle: () => {}
    },
    {
        id: 3,
        getLabel: (filters) => `${filters.manufacturername}`,
        isActive: () => true,
        isVisible: (filters) => filters.manuid,
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = {...filters}
            delete newFilters.manufacturername
            delete newFilters.manuid
            return newFilters
        },
        onToggle: () => {}
    },

]
function FilterViewer({filters = {}, onChange = null}) {
    const classes = useStyles()
    const visibleFilters = useMemo(() => {
        return FILTER_LIST.filter(x => x.isVisible(filters))
    },[filters])
    return (
        <Box component="ul" className={classes.root}>
            {visibleFilters.map(x => (
                <li key={x.id}>
                    <Chip
                        label={x.getLabel(filters)}
                        color={x.isActive(filters) ? 'primary' : 'default'}
                        clickable={!x.isRemovable}
                        onClick={x.isRemovable ? null : () => {
                            if(!onChange) return 
                            const newFilters = x.onToggle(filters)
                            onChange(newFilters)
                        }}
                        onDelete={x.isRemovable ? () => {
                            if(!onChange) return 
                            const newFilters = x.onRemove(filters)
                            onChange(newFilters)
                        } : null}
                    >

                    </Chip>
                </li>
            ))}
        </Box>
    );
}

export default FilterViewer;