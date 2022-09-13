export default class FormatUtils {
    
    static formatDate = (dateString: string): string => {
        const d = new Date(dateString);
        return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} ${d.getHours() + 1}:${d.getMinutes()}:${d.getSeconds()}`;
    }

    static formatCommentDate = (dateString: string): string => {
        const now = new Date();
        // Date string is in UTC
        const commented = new Date(`${dateString}Z`);

        // Age of the comment in minutes
        const diff = Math.floor((now.getTime() - commented.getTime()) / 60000);
        // Approx. age of comment in years
        const yearDiff = now.getFullYear() - commented.getFullYear();
        if (yearDiff > 1) {
            return `${yearDiff} years ago`;
        }

        if (diff < 1) {
            return '1 minute ago';
        }
        if (diff < 60) {
            return `${diff} minutes ago`
        }
        if (diff < 120) {
            return '1 hour ago';
        }
        if (diff < 1440) {
            return `${Math.floor(diff / 60)} hours ago`;
        }
        if (diff < 2880) {
            return 'yesterday';
        }
        if (diff < 43200) {
            return `${Math.floor(diff / 1440)} days ago`;
        }
        if (diff < 86400) {
            return '1 month ago';
        }
        if (diff < 518400) {
            return `${Math.floor(diff / 43200)} months ago`;
        }

        return 'last year';
    }

    static formatCommentScore = (score: number): string => {
        return score > 0 ? `+${score}` : `${score}`;
    }
}