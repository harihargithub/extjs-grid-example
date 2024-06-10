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
            // Split the full name into words
            const words = fullName.split(' ');
            // Initialize an empty string for initials
            let initials = '';
          
            // Iterate through each word in the array
            words.forEach(word => {
              // Add the first character of each word to initials (and convert to uppercase)
              initials += word.charAt(0).toUpperCase();
            });
          
            // Return the initials
            return initials;
          }
    },
    tpl: '{initials}'
});
