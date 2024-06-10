Ext.define('Overrides.menu.Menu', {
    override: 'Ext.menu.Menu',
    privates: {
        applyGroups: function (groups, oldGroups) {
            var me = this,
                currentGroups = Ext.apply({}, oldGroups),
                isConfiguring = me.isConfiguring,
                groupName, members, len, i, item, value, oldValue;

            if (groups) {
                me.updatingGroups = true;

                for (groupName in groups) {
                    oldValue = currentGroups[groupName];
                    currentGroups[groupName] = value = groups[groupName];

                    if (!isConfiguring) {
                        members = me.lookupName(groupName);
                        //fix members null
                        if (members) {
                            for (i = 0, len = members.length; i < len; i++) {
                                item = members[i];

                                // Set checked state depending on whether the value is the group's value
                                item.setChecked(item.getValue() === value);
                            }
                        }


                        me.fireEvent('groupchange', me, groupName, value, oldValue);
                    }
                }

                me.updatingGroups = false;
            }

            return currentGroups;
        }
    }

});