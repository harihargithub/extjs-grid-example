Ext.define('SenchaExample.ux.Avatar', {
    extend: 'Ext.Component',
    alias: 'widget.avatar',

    config: {
        fullName: ''
    },
    baseCls: 'x-avatar',
  
    applyFullName: function (newValue, oldValue) {
        this.setData({
            initials: this.getInitials(newValue)
        });
        return newValue
    },
    privates: {
         getInitials(fullName) {
            const words = fullName.split(' ');
            let initials = '';
          
            words.forEach(word => {
              initials += word.charAt(0).toUpperCase();
            });
          
            return initials;
          }
    },
    tpl: '{initials}'
});
