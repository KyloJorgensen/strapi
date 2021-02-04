import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Pencil } from '@buffetjs/icons';
import { Text, IconLinks } from '@buffetjs/core';
import { CustomRow } from '@buffetjs/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getTrad } from '../../utils';

const LocaleSettingsPage = ({ locale, onDelete, onEdit }) => {
  const { formatMessage } = useIntl();

  const links = [];

  if (onEdit) {
    links.push({
      icon: (
        <span aria-label="Edit locale">
          <Pencil fill="#0e1622" />
        </span>
      ),
      onClick: () => onEdit(locale),
    });
  }

  if (onDelete) {
    links.push({
      icon: !locale.isDefault ? (
        <span aria-label="Delete locale">
          <FontAwesomeIcon icon="trash-alt" />
        </span>
      ) : null,
      onClick: () => onDelete(locale),
    });
  }

  return (
    <CustomRow>
      <td>
        <Text>{locale.code}</Text>
      </td>
      <td>
        <Text fontWeight="semiBold">{locale.displayName}</Text>
      </td>
      <td>
        <Text>
          {locale.isDefault
            ? formatMessage({ id: getTrad('Settings.locales.row.default-locale') })
            : null}
        </Text>
      </td>
      <td>
        <IconLinks links={links} />
      </td>
    </CustomRow>
  );
};

LocaleSettingsPage.defaultProps = {
  onDelete: undefined,
  onEdit: undefined,
};

LocaleSettingsPage.propTypes = {
  locale: PropTypes.shape({
    isDefault: PropTypes.bool,
    displayName: PropTypes.string,
    code: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default LocaleSettingsPage;