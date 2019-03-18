export type IValidatePredicate = (
        /**
         * Current property's value.
         */
        value: any,
        /**
         * Current object.
         */
        target?: any,
    ) => boolean;
